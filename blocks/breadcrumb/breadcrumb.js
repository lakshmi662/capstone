function generateBreadcrumbHTML(pagePath) {
    const paths = pagePath.replace(/^\/|\/$/g, '').split('/');
    let html = '<span class="breadcrumb-item"><a href="/">Home</a></span>';
   
    let currentHref = '';
    paths.forEach((path, index) => {
        if (path) {
            currentHref += `/${path}`;
            const isLast = index === paths.length - 1;
           
            if (isLast) {
                html += `<span class="breadcrumb-separator">/</span><span class="breadcrumb-item">${path}</span>`;
            } else {
                html += `<span class="breadcrumb-separator">/</span><span class="breadcrumb-item"><a href="${currentHref}">${path}</a></span>`;
            }
        }
    });
   
    return html;
}
 
export default function decorate(block) {
    const pagePath = window.location.pathname;
    block.innerHTML = generateBreadcrumbHTML(pagePath);
}