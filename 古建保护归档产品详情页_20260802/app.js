const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const sectionLinks = [...document.querySelectorAll('.nav-links a')];
const prototypeShell = document.querySelector('.prototype-shell');
const prototypeFrame = document.querySelector('[data-prototype-frame] iframe');

const mobileSteps = [
  {
    title: '建立任务',
    summary: '先写清这次项目要交付什么，后续资料清单和检查项都从这里产生。',
    points: ['确定保护对象与项目用途', '选择成果、规范和精度要求', '记录操作、审核、接收和确认角色']
  },
  {
    title: '整理资料',
    summary: '把照片、尺寸、草图和既有文件放进同一项任务，并标出缺失与质量问题。',
    points: ['登记来源、时间和使用条件', '检查遮挡、模糊、缺面和重复', '生成补拍、补测或补文件任务']
  },
  {
    title: '核对构件',
    summary: '系统形成构件和关系草稿，用户逐项查看依据并处理未知内容。',
    points: ['查看候选类别、位置和证据', '确认或修改构件信息', '记录修改原因与影响范围']
  },
  {
    title: '记录现状',
    summary: '实测数据、空间关系、保存现状和专业判断分别记录，存疑区域继续保留。',
    points: ['核对实测与尺度基准', '记录构件位置、状态和依据', '将遮挡和资料不足转入复核']
  },
  {
    title: '制作成果',
    summary: '同一版对象数据用于生成图纸、清单和现状记录，减少多份文件重复修改。',
    points: ['选择适用的画法和版式', '预览图纸与配套材料', '导出正式文件和结构化数据']
  },
  {
    title: '检查成果',
    summary: '尺寸、规范、完整性和责任确认分别检查，问题可以回到对应对象与资料。',
    points: ['运行输入与图纸预检', '按风险处理未知项和冲突', '记录退回、修改、复核和确认']
  },
  {
    title: '准备交付',
    summary: '正式文件、来源、检查、版本和权限共同组成可核验的交付包。',
    points: ['核对文件清单和版本', '确认接收方与使用权限', '保存交付、接收和退回记录']
  },
  {
    title: '后续复查',
    summary: '新资料先形成变化疑问，专业人员确认后再更新同一对象的正式记录。',
    points: ['连接同一建筑和构件的多期记录', '区分现场变化与采集差异', '生成复查任务并保留历史版本']
  }
];

let mobileIndex = 0;
const mobileTabs = document.querySelector('[data-mobile-tabs]');
const mobilePanel = document.querySelector('[data-mobile-panel]');
const mobileCount = document.querySelector('[data-mobile-count]');

function setHeaderState() {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}

function closeMobileNav() {
  navLinks?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}

function renderMobileStep(index) {
  if (!mobileTabs || !mobilePanel || !mobileCount) return;
  mobileIndex = (index + mobileSteps.length) % mobileSteps.length;
  const step = mobileSteps[mobileIndex];
  [...mobileTabs.children].forEach((button, buttonIndex) => {
    button.setAttribute('aria-selected', String(buttonIndex === mobileIndex));
    button.tabIndex = buttonIndex === mobileIndex ? 0 : -1;
  });
  mobileCount.textContent = `${String(mobileIndex + 1).padStart(2, '0')} / ${String(mobileSteps.length).padStart(2, '0')}`;
  mobilePanel.innerHTML = `
    <span class="mobile-step-number">${String(mobileIndex + 1).padStart(2, '0')} · 产品流程</span>
    <h3>${step.title}</h3>
    <p>${step.summary}</p>
    <ul>${step.points.map((point) => `<li>${point}</li>`).join('')}</ul>
  `;
}

function buildMobilePrototype() {
  if (!mobileTabs) return;
  mobileSteps.forEach((step, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'tab';
    button.textContent = step.title;
    button.addEventListener('click', () => renderMobileStep(index));
    mobileTabs.append(button);
  });
  renderMobileStep(0);
}

function setActiveNav() {
  const ids = sectionLinks.map((link) => link.getAttribute('href')).filter(Boolean);
  let activeId = '';
  ids.forEach((id) => {
    const section = document.querySelector(id);
    if (section && section.getBoundingClientRect().top <= 180) activeId = id;
  });
  sectionLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === activeId));
}

navToggle?.addEventListener('click', () => {
  const open = navLinks?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(Boolean(open)));
});

sectionLinks.forEach((link) => link.addEventListener('click', closeMobileNav));

document.querySelector('[data-prototype-reset]')?.addEventListener('click', () => {
  try {
    prototypeFrame.contentWindow.localStorage.clear();
  } catch (error) {
    console.info('原型进度将在重新加载后复位。', error);
  }
  prototypeFrame.src = 'prototype/index.html';
});

document.querySelector('[data-prototype-fullscreen]')?.addEventListener('click', async () => {
  if (!prototypeShell) return;
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await prototypeShell.requestFullscreen();
  } catch (error) {
    window.open('prototype/index.html', '_blank', 'noopener,noreferrer');
  }
});

document.querySelector('[data-mobile-prev]')?.addEventListener('click', () => renderMobileStep(mobileIndex - 1));
document.querySelector('[data-mobile-next]')?.addEventListener('click', () => renderMobileStep(mobileIndex + 1));

window.addEventListener('scroll', () => {
  setHeaderState();
  setActiveNav();
}, { passive: true });

window.addEventListener('resize', () => {
  if (window.innerWidth > 820) closeMobileNav();
});

buildMobilePrototype();
setHeaderState();
setActiveNav();
