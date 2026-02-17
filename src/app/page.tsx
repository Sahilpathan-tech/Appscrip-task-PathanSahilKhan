import Image from "next/image";
import Script from "next/script";
import styles from "./page.module.css";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

async function getProducts(): Promise<Product[]> {
  const response = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store", // force SSR on every request
  });

  if (!response.ok) {
    throw new Error("Failed to load products from Fake Store API");
  }

  return response.json();
}

export default async function Home() {
  const products = await getProducts();

  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Discover Our Products",
    description:
      "Browse a curated list of demo products rendered on a server-side Appscrip PLP implementation.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://example.com/products/${product.id}`,
        name: product.title,
      })),
    },
  };

  return (
    <>
      <Script
        id="plp-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <span className={styles.logoMark} aria-hidden="true">
              ◼
            </span>
            <span className={styles.logoText}>LOGO</span>
          </div>
          <nav className={styles.nav} aria-label="Primary navigation">
            <a href="#" className={styles.navLink}>
              Home
            </a>
            <a href="#" className={styles.navLink}>
              Shop
            </a>
            <a href="#" className={styles.navLink}>
              About
            </a>
            <a href="#" className={styles.navLink}>
              Contact
            </a>
          </nav>
          <div className={styles.headerActions}>
            <button className={styles.iconButton} aria-label="Search products">
              🔍
            </button>
            <button className={styles.iconButton} aria-label="View wishlist">
              ♡
            </button>
            <button className={styles.iconButton} aria-label="View cart">
              🛒
            </button>
          </div>
        </header>

        <main className={styles.main}>
          <section className={styles.hero} aria-labelledby="plp-heading">
            <h1 id="plp-heading" className={styles.heading}>
              Discover our products
            </h1>
            <p className={styles.subheading}>
              A clean, responsive product listing page powered by server-side
              rendering and a mock e‑commerce API.
            </p>
          </section>

          <section className={styles.content}>
            <aside className={styles.filters} aria-label="Product filters">
              <div className={styles.filtersHeader}>
                <h2 className={styles.filtersTitle}>Filter</h2>
                <button className={styles.clearButton} type="button">
                  Clear all
                </button>
              </div>

              <div className={styles.filterGroup}>
                <h3 className={styles.filterHeading}>Category</h3>
                <ul className={styles.filterList}>
                  {categories.map((category) => (
                    <li key={category} className={styles.filterItem}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="category"
                          value={category}
                          disabled
                        />
                        <span>{category}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                <p className={styles.filterHint}>
                  Categories are read from the API to show how filters would be
                  wired, but are left intentionally static for this demo.
                </p>
              </div>

              <div className={styles.filterGroup}>
                <h3 className={styles.filterHeading}>Price range</h3>
                <div className={styles.rangeRow}>
                  <span className={styles.rangeLabel}>$0</span>
                  <div className={styles.rangeTrack} aria-hidden="true">
                    <div className={styles.rangeFill} />
                  </div>
                  <span className={styles.rangeLabel}>$200</span>
                </div>
                <p className={styles.filterHint}>
                  Slider is decorative to keep the DOM light; in a real app this
                  would control a server‑side query.
                </p>
              </div>
            </aside>

            <section
              className={styles.gridSection}
              aria-label="Product listing"
            >
              <div className={styles.gridHeader}>
                <div>
                  <h2 className={styles.gridTitle}>All products</h2>
                  <p className={styles.gridSubtitle}>
                    {products.length} items from Fake Store API
                  </p>
                </div>
                <div className={styles.sortRow}>
                  <label className={styles.sortLabel}>
                    Sort by{" "}
                    <select
                      className={styles.sortSelect}
                      name="sort"
                      defaultValue="featured"
                      aria-label="Sort products by"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className={styles.grid}>
                {products.map((product) => (
                  <article
                    key={product.id}
                    className={styles.card}
                    aria-label={product.title}
                  >
                    <div className={styles.cardImageWrapper}>
                      <Image
                        src={product.image}
                        alt={`${product.title} product image`}
                        fill
                        sizes="(min-width: 1200px) 20vw, (min-width: 768px) 30vw, 45vw"
                      />
                    </div>
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{product.title}</h3>
                      <p className={styles.cardCategory}>{product.category}</p>
                      <p className={styles.cardPrice}>
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </section>
        </main>

        <footer className={styles.footer}>
          <div className={styles.footerColumn}>
            <h2 className={styles.footerHeading}>About</h2>
            <p className={styles.footerText}>
              This is a demo product listing page inspired by the Appscrip PLP
              design, implemented with semantic HTML, CSS and SSR in Next.js.
            </p>
          </div>
          <div className={styles.footerColumn}>
            <h2 className={styles.footerHeading}>Contact</h2>
            <ul className={styles.footerList}>
              <li>Email: hello@example.com</li>
              <li>Phone: +1 (555) 010‑0000</li>
              <li>Location: Remote‑first</li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h2 className={styles.footerHeading}>Follow</h2>
            <ul className={styles.footerList}>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">LinkedIn</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
