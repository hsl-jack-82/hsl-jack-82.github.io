// ===================================
// 导航栏滚动效果
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // 滚动超过 100px 时添加阴影
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// 平滑滚动锚点导航（兼容性增强）
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        // 跳过空的 href
        if (targetId === '#' || !targetId) {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {
            // 计算导航栏高度偏移
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// 滚动动画（Intersection Observer）
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // 动画只触发一次，取消观察
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    // 观察技能卡片
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        // 添加延迟动画效果
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // 观察项目卡片
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // 观察博客条目
    const blogItems = document.querySelectorAll('.blog-item');
    blogItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
});

// ===================================
// 导航栏高亮当前区域（可选功能）
// ===================================
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-menu a[href="#${id}"]`);

            // 移除所有高亮
            navLinks.forEach(link => {
                link.style.color = '';
            });

            // 添加当前高亮
            if (correspondingLink) {
                correspondingLink.style.color = 'var(--color-primary)';
            }
        }
    });
}, {
    threshold: 0.3
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===================================
// 性能优化：防抖函数
// ===================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// 页面加载完成后的初始化
// ===================================
window.addEventListener('load', () => {
    // 添加加载完成的类（可用于后续扩展）
    document.body.classList.add('loaded');
});

// ===================================
// 导出功能（如果需要模块化）
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        observer
    };
}
