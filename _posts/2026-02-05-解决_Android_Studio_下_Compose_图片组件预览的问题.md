---
layout: post
title: "解决 Android Studio 下 Compose 图片组件预览的问题"
date: 2026-02-05 10:00:00 +0800
categories: [Android, "Android Studio 预览"]
---

# 发现问题
我在android studio中预览某个ui时出现问题：
```
java.lang.ClassCastException: class com.android.layoutlib.bridge.android.ApplicationContext cannot be cast to class android.app.Application (com.android.layoutlib.bridge.android.ApplicationContext and android.app.Application are in unnamed module of loader com.intellij.ide.plugins.cl.PluginClassLoader @33a840ae)
```
我经过检查发现是在预览函数中
```kotlin
val application = LocalContext.current.applicationContext as Application
```
这行代码会出现问题，原因是在预览环境下返回的是 `ComposeViewAdapter` 的上下文，而不是预期的 `Application` 上下文

经过修改后，我 Mock 了整个ViewModel：
```kotlin
val previewViewModel = object : ImageDetailViewModel(Application()) {  
  
    // 步骤2：重写 imageItem，提供一个假的 StateFlow    private val _imageItem = MutableStateFlow<ImageEntity?>(  
        ImageEntity(  
            uri = imageUri.toString(),  
            description = "一张漂亮的风景照",  
            date = System.currentTimeMillis()  
        )  
    )  
    override val imageItem: StateFlow<ImageEntity?> = _imageItem  
  
    // 步骤3：重写 tags，提供一个假的标签列表 StateFlow    private val _tags = MutableStateFlow<List<TagEntity>>(  
        listOf(  
            TagEntity(tagName = "风景"),  
            TagEntity(tagName = "天空"),  
            TagEntity(tagName = "山脉")  
        )  
    )  
    override val tags: StateFlow<List<TagEntity>> = _tags  
  
    // 步骤4：重写所有方法，让它们在预览中什么都不做，或者模拟简单的 UI 交互  
    override fun loadTagsForImage(uri: String) {  
        // 在预览中，数据是硬编码的，所以这个方法不需要执行任何操作  
    }  
  
    override fun addTag(tagName: String) {  
        // 为了让预览更具交互性，我们可以模拟添加标签的行为  
        val currentTags = _tags.value.toMutableList()  
        currentTags.add(TagEntity(tagName = tagName.trim()))  
        _tags.value = currentTags  
    }  
}
```

然后出现了问题：
```
java.lang.NullPointerException: Cannot invoke "android.content.Context.getApplicationContext()" because "this.mBase" is null at android.content.ContextWrapper.getApplicationContext(ContextWrapper.java:152)
```

我检查后发现整个UI文件中并没有用到 `Application` 这个上下文，经检查，我发现是 Mock 类继承了 `ImageDetailViewModel`，在执行初始化时，首先执行了 `ImageDetailViewModel` 的
```kotlin
open class ImageDetailViewModel(application: Application) : AndroidViewModel(application) {  
  
    private val dao = AppDatabase.getDatabase(application).photoTagDao()
    ...
}
```

这正是出现空指针异常的原因。

# 解决方案
通过新建一个 `ImageDetailViewModelInterface` 让 Mock 类和 `ImageDetailViewModel` 都从这个接口类派生，然后将 `ImageDetailScreen` 接受的参数改为接受这个接口类。