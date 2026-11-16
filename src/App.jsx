import { useMemo, useState } from "react";
import { ShoppingBag, Menu, X, ArrowUpRight, Plus, Minus, Instagram, MoveRight, Check } from "lucide-react";

const products = [
  { id: 1, name: "CORE OVERSIZED HOODIE", category: "Hoodies", price: 549, tag: "BESTSELLER", color: "Black", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1100&q=85", tone: "dark" },
  { id: 2, name: "IDENTITY GRAPHIC TEE", category: "T-Shirts", price: 249, tag: "DROP 001", color: "Washed Black", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1100&q=85", tone: "light" },
  { id: 3, name: "AFTER HOURS ZIP HOODIE", category: "Hoodies", price: 599, tag: "LIMITED", color: "Charcoal", image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1100&q=85", tone: "dark" },
  { id: 4, name: "CARTEL HEAVYWEIGHT CAP", category: "Accessories", price: 199, tag: "NEW", color: "Black", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1100&q=85", tone: "dark" }
];

function App() {
  const [cart, setCart] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [notice, setNotice] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "" });
  const [orderDone, setOrderDone] = useState(false);

  const visible = useMemo(() => filter === "All" ? products : products.filter(p => p.category === filter), [filter]);
  const count = cart.reduce((n, item) => n + item.qty, 0);
  const total = cart.reduce((n, item) => n + item.price * item.qty, 0);

  function add(product) {
    setCart(old => old.some(i => i.id === product.id)
      ? old.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      : [...old, { ...product, qty: 1 }]);
    setNotice("Added to your bag");
    setTimeout(() => setNotice(""), 1800);
  }
  function changeQty(id, delta) {
    setCart(old => old.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  }
  function submitOrder(e) {
    e.preventDefault();
    if (!cart.length) return;
    const order = { customer: form, items: cart, total, createdAt: new Date().toISOString() };
    const previous = JSON.parse(localStorage.getItem("cartel_demo_orders") || "[]");
    localStorage.setItem("cartel_demo_orders", JSON.stringify([...previous, order]));
    setOrderDone(true);
    setCart([]);
  }

  return (
    <>
      <div className="announcement">FREE DELIVERY ON ORDERS OVER 600 MAD <span>—</span> DROP 001 AVAILABLE NOW</div>
      <header className="header">
        <a className="wordmark" href="#top" aria-label="CARTEL home">CARTEL<span>®</span></a>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#collection" onClick={() => setMenuOpen(false)}>SHOP</a>
          <a href="#story" onClick={() => setMenuOpen(false)}>OUR STORY</a>
          <a href="#footer" onClick={() => setMenuOpen(false)}>CONTACT</a>
        </nav>
        <div className="header-actions">
          <button className="bag-button" onClick={() => setBagOpen(true)} aria-label="Open shopping bag"><ShoppingBag size={18}/><span>BAG ({count})</span></button>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-image"></div>
          <div className="hero-shade"></div>
          <div className="hero-copy">
            <p className="eyebrow"><span className="red-dot"></span> INDEPENDENT STREETWEAR / MOROCCO</p>
            <h1>WEAR<br/><em>YOUR</em><br/>IDENTITY<span>.</span></h1>
            <div className="hero-bottom">
              <p>MORE THAN A BRAND.<br/>A STATEMENT OF WHO YOU ARE.</p>
              <a className="circle-link" href="#collection">EXPLORE<br/>THE DROP <ArrowUpRight size={18}/></a>
            </div>
          </div>
          <div className="hero-index">001 <span>—</span> 004</div>
          <div className="vertical-note">CARTEL / EST. MMXXV</div>
        </section>

        <section className="ticker" aria-label="Brand statement"><div>NO RULES. NO UNIFORM. JUST IDENTITY. <b>✳</b> NO RULES. NO UNIFORM. JUST IDENTITY. <b>✳</b> NO RULES. NO UNIFORM. JUST IDENTITY. <b>✳</b></div></section>

        <section className="collection section" id="collection">
          <div className="section-head">
            <div><p className="eyebrow">01 / THE FIRST RELEASE</p><h2>DROP <span>001</span></h2></div>
            <p className="section-description">Built for those who move different.<br/>Limited pieces. Permanent attitude.</p>
          </div>
          <div className="filters">
            {["All", "Hoodies", "T-Shirts", "Accessories"].map(f => <button key={f} className={filter === f ? "filter active" : "filter"} onClick={() => setFilter(f)}>{f}</button>)}
          </div>
          <div className="product-grid">
            {visible.map((p, index) => <article className="product" key={p.id}>
              <div className="product-image-wrap">
                <img src={p.image} alt={p.name} loading="lazy"/>
                <span className="product-tag">{p.tag}</span>
                <button className="quick-add" onClick={() => add(p)} aria-label={`Add ${p.name} to bag`}><Plus size={20}/></button>
                <span className="product-number">0{index + 1}</span>
              </div>
              <div className="product-meta"><div><h3>{p.name}</h3><p>{p.color} / {p.category}</p></div><strong>{p.price} MAD</strong></div>
            </article>)}
          </div>
          <p className="catalog-note">PRODUCT IMAGES ARE PRESENTATION REFERENCES. FINAL GARMENT PHOTOGRAPHY WILL BE ADDED BEFORE SALES.</p>
        </section>

        <section className="manifesto" id="story">
          <div className="manifesto-mark">C<span>.</span></div>
          <div className="manifesto-copy">
            <p className="eyebrow">02 / THE CARTEL MINDSET</p>
            <h2>NOT MADE<br/>TO <em>BLEND IN.</em></h2>
            <p className="manifesto-text">CARTEL is an independent streetwear label built around individuality, confidence and self-expression. We don't follow the noise. We create our own signal.</p>
            <a className="text-link" href="#collection">DISCOVER THE COLLECTION <MoveRight size={18}/></a>
          </div>
          <div className="manifesto-side">MORE THAN A BRAND<br/>AN IDENTITY.</div>
        </section>

        <section className="quote-strip">
          <p>“YOUR IDENTITY. YOUR RULES.”</p><span>— CARTEL CREW</span>
        </section>
      </main>

      <footer id="footer" className="footer">
        <div className="footer-top"><div><a className="footer-logo" href="#top">CARTEL<span>®</span></a><p>WEAR YOUR IDENTITY.</p></div><div className="footer-links"><a href="#collection">SHOP THE DROP</a><a href="#story">OUR STORY</a><a href="https://instagram.com/" target="_blank" rel="noreferrer"><Instagram size={15}/> INSTAGRAM</a></div><div className="footer-signup"><p>STAY IN THE LOOP</p><span>NEW DROPS. NO SPAM.</span><a href="mailto:hello@cartelwear.com">HELLO@CARTELWEAR.COM <ArrowUpRight size={15}/></a></div></div>
        <div className="footer-bottom"><span>© 2026 CARTEL. ALL RIGHTS RESERVED.</span><span>MADE FOR THE INDIVIDUAL.</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>

      {notice && <div className="toast"><Check size={16}/>{notice}</div>}
      {bagOpen && <div className="overlay" onMouseDown={e => e.target === e.currentTarget && setBagOpen(false)}>
        <aside className="bag-panel">
          <div className="bag-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>THE BAG <span>({count})</span></h2></div><button onClick={() => {setBagOpen(false);setCheckout(false);setOrderDone(false)}}><X/></button></div>
          {orderDone ? <div className="success-state"><div className="success-icon"><Check/></div><h3>ORDER RECEIVED.</h3><p>Your demo order has been saved in this browser. Connect Supabase before accepting real orders.</p><button className="checkout-button" onClick={() => {setBagOpen(false);setCheckout(false);setOrderDone(false)}}>CONTINUE SHOPPING</button></div> :
          checkout ? <form className="checkout-form" onSubmit={submitOrder}><button type="button" className="back-link" onClick={() => setCheckout(false)}>← BACK TO BAG</button><h3>DELIVERY DETAILS</h3><p className="form-note">Cash on delivery · Demo checkout</p>
            {["name","phone","city","address"].map(k => <label key={k}>{({name:"FULL NAME",phone:"PHONE NUMBER",city:"CITY",address:"FULL ADDRESS"})[k]}<input required value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} placeholder={({name:"Your name",phone:"+212 6...",city:"City",address:"Street, building, area"})[k]}/></label>)}
            <div className="bag-total"><span>TOTAL</span><strong>{total} MAD</strong></div><button className="checkout-button" type="submit">PLACE DEMO ORDER <ArrowUpRight size={17}/></button><p className="secure-note">Demo only — no payment or order notification is configured.</p>
          </form> : <>
            <div className="bag-items">{cart.length === 0 ? <div className="empty-bag"><ShoppingBag size={30}/><h3>YOUR BAG IS EMPTY.</h3><p>Find something that feels like you.</p><button onClick={() => setBagOpen(false)}>EXPLORE THE DROP <ArrowUpRight size={16}/></button></div> : cart.map(item => <div className="bag-item" key={item.id}><img src={item.image} alt=""/><div className="bag-item-info"><h3>{item.name}</h3><p>{item.price} MAD</p><div className="qty"><button onClick={() => changeQty(item.id,-1)}><Minus size={13}/></button><span>{item.qty}</span><button onClick={() => changeQty(item.id,1)}><Plus size={13}/></button></div></div><strong>{item.price * item.qty} MAD</strong></div>)}</div>
            {cart.length > 0 && <div className="bag-footer"><div className="bag-total"><span>SUBTOTAL</span><strong>{total} MAD</strong></div><p>Delivery calculated at confirmation. Free over 600 MAD.</p><button className="checkout-button" onClick={() => setCheckout(true)}>CONTINUE TO CHECKOUT <ArrowUpRight size={17}/></button></div>}
          </>}
        </aside>
      </div>}
    </>
  );
}

export default App;