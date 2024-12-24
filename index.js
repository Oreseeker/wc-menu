export class WcMenu extends HTMLElement {
  static closeTriggerAttribute = 'data-close-trigger';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.#render();

    this.#processClose();
    this.#processOpen();
  }

  #render() {
    this.shadowRoot.innerHTML = `
      <slot name="toggle">
        <button class="toggle">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </button>
        <dialog>
          <slot name="content"></slot>
        </dialog>
      </slot>
      
      <style>
        .toggle {
          display: flex;
          flex-direction: column;
          padding: 6px;
          justify-content: space-between;
          border-top: 1px solid black;
        }
        
        dialog {
          margin: 0;
          width: 100dvw;
          height: 100dvh;
          transform: translate(100%);
          transition: transform 200ms;
          padding: 0;
        }
        
        dialog[open] {
          display: flex;
          
          ::slotted(*) {
            width: 100%;
          }
        }
      </style>
    `;
  }

  #processClose() {
    const selector = `[${WcMenu.closeTriggerAttribute}]`;
    this.shadowRoot.querySelector('slot[name="content"]').assignedElements().forEach($e => {
      if ($e.hasAttribute(WcMenu.closeTriggerAttribute)) {
        $e.addEventListener('click', this.#close.bind(this));
        return;
      }

      $e.querySelectorAll(selector).forEach($c => {
        $c.addEventListener('click', this.#close.bind(this));
      });
    });
  }

  #close() {
    const $dialog = this.shadowRoot.querySelector('dialog');

    $dialog.addEventListener('transitionend', () => {
      $dialog.close();
    }, { once: true });

    $dialog.style.transform = '';
  }

  #open() {
    const $dialog = this.shadowRoot.querySelector('dialog');
    $dialog.showModal();

    $dialog.style.transform = 'translate(0)';
  }

  #processOpen() {
    const $toggleSlot = this.shadowRoot.querySelector('slot[name="toggle"]');

    const $opener = $toggleSlot.assignedElements()[0] ?? $toggleSlot.children[0];

    $opener.addEventListener('click', this.#open.bind(this));
  }
}

customElements.define('wc-menu', WcMenu);