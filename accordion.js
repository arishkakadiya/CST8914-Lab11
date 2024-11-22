//pseudocode
/*
  1.Grab the accordion buttons from the DOM
  2. go through each accordion button one by one
  3. Use the classlist dom method in combination with the toggle method provided by the DOM to add or remove the "is-open" class. At this point, the accordion button should be able to switch back and forth between its font awesome icons but there is no content inside of it. This is because of the overflow:hidden and the max-height of zero; it is hiding our content. So now we must use javascript to change these values with DOM CSS
  4. get the div that has the content of the accordion button you are currently looking at; we do this using the .nextElementSibling method which allows us to look at the html element that is directly next to the current html element we are looking at. Since we are currently looking at a button (accordion button), the next element after that is the div with the class accordion-content. This is exactly what we want because it allows us to work with the div that has the content that we want to display. Also please note that we could have got to this div in another way but this is the "shortest path" to our answer.
  
  5. set the max-height based on whether the current value of the max-height css property. If the max-height is currently 0 (if the page has just been visited for the first time) or null (if it has been toggled once already) which means that it is closed, you will give it an actual value so the content will be shown; if not then that means the max-height currently has a value and you can set it back to null to close it.
  6. If the accordion is closed we set the max-height of the currently hidden text inside the accordion from 0 to the scroll height of the content inside the accordion. The scroll height refers to the height of an html element in pixels. For this specific example, we are talking about the height of the div with the class accordion-content with all of its nested ptags
*/

class Accordion {
  constructor(domNode) {
    // Save the reference to the accordion container
    this.accordion = domNode;

    // Get all buttons inside the accordion container
    this.buttons = Array.from(this.accordion.querySelectorAll('.accordion'));

    // Add click and keydown event listeners to each button
    this.buttons.forEach(button => {
      button.addEventListener('click', () => this.togglePanel(button)); // Handles mouse interaction
      button.addEventListener('keydown', e => this.handleKeydown(e)); // Handles keyboard interaction
    });
  }
  togglePanel(button) {
    // Check if the panel is currently expanded, if expanded it screen reader will announce it
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Get the associated content panel using aria-controls
    const content = document.getElementById(button.getAttribute('aria-controls'));

    // Update the aria-expanded attribute to reflect the new state
    button.setAttribute('aria-expanded', !isExpanded);

    // Show or hide the content panel by toggling the `hidden` attribute and max-height
    if (!isExpanded) {
      content.hidden = false; // Make the content visible
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null; // Remove max-height to collapse smoothly
      content.hidden = true; // Hide the content
    }
  }

  /**
   * Handles keyboard navigation for accessibility.
   * Allows toggling the panel with the Enter or Space key.
   * 
   */
  handleKeydown(e) {
    // Check if the pressed key is Enter or Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevent default scroll behavior for Space
      e.target.click(); // Simulate a click on the button
    }
  }
}
// Initialize the accordion when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const accordionContainer = document.querySelector('.accordion-container'); // Get the accordion container
  if (accordionContainer) {
    new Accordion(accordionContainer); // Initialize the Accordion class
  }
});
