import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Decorates the footer with logo, copyright text, and subscribe form.
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';

  const mainFooter = document.createElement('div');
  mainFooter.className = 'footer-main';

  const footerContent = document.createElement('div');
  footerContent.className = 'footer-content';

  const copyright = document.createElement('div');
  copyright.className = 'footer-copyright';

  const copyrightContent = document.createElement('div');
  copyrightContent.className = 'copyright-content';

  const subscription = document.createElement('div');
  subscription.className = 'footer-subscription';

  const subForm = document.createElement('div');
  subForm.className = 'subscribe-form';

  const subInput = document.createElement('input');
  subInput.setAttribute('type', 'email');
  subInput.className = 'subscribe-input';
  subInput.placeholder = 'Enter your email';

  const subButton = document.createElement('button');
  subButton.textContent = 'Subscribe';
  subButton.className = 'subscribe-button';

  subForm.appendChild(subInput);
  subForm.appendChild(subButton);
  subscription.appendChild(subForm);

  const sections = fragment.querySelectorAll('.section');

  sections.forEach((section, index) => {
    if (index < 5) {
      footerContent.appendChild(section);
      section.classList.add('footer-section');
    } else {
      const content = section.querySelector('.default-content-wrapper');
      if (content) {
        
        
        if (content.querySelector('p')) {
          const textWrapper = document.createElement('div');
          textWrapper.className = 'copyright-text';
          textWrapper.innerHTML = content.querySelector('p').innerHTML;
          copyrightContent.appendChild(textWrapper);
        } 
        
        if (content.querySelector('ul')) {
          const linksWrapper = document.createElement('div');
          linksWrapper.className = 'copyright-links';
          content.querySelectorAll('li').forEach(li => {
            const link = document.createElement('a');
            link.href = li.querySelector('a') ? li.querySelector('a').href : '#';
            link.textContent = li.textContent;
            linksWrapper.appendChild(link);
          });
          copyrightContent.appendChild(linksWrapper);
        }
      }
    }
  });  

  if (!copyrightContent.querySelector('.copyright-text')) {
    const fallbackText = document.createElement('div');
    fallbackText.className = 'copyright-text';
    fallbackText.textContent = '© 2025 Edge Delivery Services. All rights reserved.';
    copyrightContent.appendChild(fallbackText);
  }

  mainFooter.appendChild(footerContent);
  block.appendChild(mainFooter);
  block.appendChild(subscription);
  block.appendChild(copyright);
  copyright.appendChild(copyrightContent);

  block.classList.add('footer-wrapper');
}
