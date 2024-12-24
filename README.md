# WC-menu - reusable mobile menu

## Installation

### via npm
Execute the following command in your project:
```shell
npm i @oreseeker/wc-menu
```

## Usage
```html
<wc-menu>
  <button slot="toggle">Open</button>
  <div slot="content"></div>
</wc-menu>
```

### Slots
- `toggle` - requires only one root element. This element is used for opening menu;
- `content` - required only one root element. Any number of elements starting from root in this slot can have `data-close-trigger`
attribute which will make the elements triggering menu close.
