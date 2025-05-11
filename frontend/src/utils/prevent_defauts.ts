
const preventDefaults = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    if (e instanceof DragEvent && e.dataTransfer) {
        e.dataTransfer.dropEffect = 'none'
    }
}
const preventEvents = ['dragenter', 'dragover', 'dragleave', 'contextmenu']

export const preventDocumentDefaultEvents = () => {
    // 阻止默认行为（阻止浏览器打开文件）
    preventEvents.forEach(eventName => {
        document.addEventListener(eventName, preventDefaults, false);
    });
}