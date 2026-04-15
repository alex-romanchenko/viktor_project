(() => {
  const list = document.getElementById("tourList");
  const empty = document.getElementById("tourEmpty");
  const cityInput = document.getElementById("cityFilter");
  const tabs = Array.from(document.querySelectorAll(".tour-tabs .tab"));
  const cards = Array.from(document.querySelectorAll(".tour-card"));

  if (!list || !cards.length || !tabs.length) return;

  let activeFilter = "upcoming";

  function normalize(s){
    return (s || "").toString().trim().toLowerCase();
  }

  function apply(){
    const cityQ = normalize(cityInput?.value);

    let visibleCount = 0;

    cards.forEach(card => {
      const status = card.dataset.status; // upcoming/past
      const city = normalize(card.dataset.city);

      const okByTab =
        activeFilter === "all" ||
        status === activeFilter;

      const okByCity =
        !cityQ || city.includes(cityQ);

      const show = okByTab && okByCity;

      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (empty) empty.hidden = visibleCount !== 0;
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      activeFilter = tab.dataset.filter || "upcoming";
      apply();
    });
  });

  cityInput?.addEventListener("input", apply);

  apply();
})();
