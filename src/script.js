import gallery_items from "../src/gallery-items.js";

class Gallery {
  constructor(options) {
    this.images = options.images;
    this.elements = document.querySelector(options.element);
    this.lightbox = document.querySelector(options.lightbox);

    this.init();
  }

  init() {
    this.render();
    this.events();
  }

  events() {
    this.elements.onclick = event => {
      event.preventDefault();
      let target = event.target;
      if (target.tagName !== "IMG") return;

      this.lightbox
        .querySelector(".lightbox___image")
        .setAttribute("src", target.dataset.source);
      this.lightbox.classList.toggle("is-open");
    };

    this.lightbox.onclick = event => {
      event.preventDefault();
      let target = event.target;

      if (target.className === "lightbox__content") {
        this.lightbox.classList.remove("is-open");
      }
    };

    this.lightbox.querySelector(
      'button[data-action="close-lightbox"]'
    ).onclick = event => {
      event.preventDefault();
      this.lightbox.classList.remove("is-open");
    };

    document.onkeydown = evt => {
      evt = evt || window.event;
      if (evt.keyCode === 27) {
        this.lightbox.classList.remove("is-open");
      }
    };
  }

  template(image) {
    const { preview, original, description } = image;

    return `
          <li class="gallery__item">
            <a
              class="gallery__link"
              href="${original}"
            >
              <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
              />
  
              <span class="gallery__icon">
                <i class="material-icons">zoom_out_map</i>
              </span>
            </a>
          </li>
      `;
  }
  render() {
    this.elements.innerHTML = this.images.map(this.template).join("");
  }
}

new Gallery({
  element: ".gallery",
  lightbox: ".lightbox",
  images: gallery_items
});
