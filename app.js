// Data and Engine are globally available from script tags in index.html

const engine = new BookingEngine();
let currentScenarioIdx = 0;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    reformatStructureExplorer();
    renderQuiz();
    setupEventListeners();
    populateSelects();
    setupModal();
});

// --- MODAL LOGIC ---
function setupModal() {
    const modal = document.getElementById('info-modal');
    const closeBtn = document.querySelector('.close-modal');

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    };
}

function showInfo(itemId) {
    let item;
    if (itemId === 'root') {
        item = {
            name: BOP_STRUCTURE.name,
            details: BOP_STRUCTURE.details,
            // Hardcode sub-lists for the top level for clarity as requested
            description: "Die Zahlungsbilanz umfasst alle Transaktionen zwischen In- und Ausland."
        };
    } else {
        item = findStructureItem(BOP_STRUCTURE, itemId);
    }

    if (!item) return;

    const modal = document.getElementById('info-modal');
    const body = document.getElementById('modal-body');

    body.innerHTML = `
        <h2>${item.name}</h2>
        <p>${item.details || item.description}</p>
        
        ${item.impact ? `
            <div class="impact-box">
                <strong>💡 Beispiel & Auswirkung:</strong><br>
                ${item.impact}
            </div>
        ` : ''}

        ${item.examples ? `
            <h3>Weitere Beispiele:</h3>
            <ul>${item.examples.split(', ').map(ex => `<li>${ex}</li>`).join('')}</ul>
        ` : ''}

        ${item.doubleEntry ? `
            <div class="impact-box" style="border-color: var(--primary); background: rgba(99,102,241,0.1)">
                <strong>🔄 Doppelte Buchführung:</strong><br>
                ${item.doubleEntry}
            </div>
        ` : ''}
    `;

    modal.style.display = 'flex';
}

function findStructureItem(obj, id) {
    if (obj.id === id) return obj;
    if (obj.children) {
        for (let child of obj.children) {
            const found = findStructureItem(child, id);
            if (found) return found;
        }
    }
    return null;
}

// --- PHASE 1: REFORMATTED STRUCTURE EXPLORER (4 PILLARS) ---
function reformatStructureExplorer() {
    const root = document.getElementById('tree-root');
    root.innerHTML = '';

    // Create central Header (Zahlungsbilanz)
    const headerNode = document.createElement('div');
    headerNode.className = 'node';
    headerNode.innerHTML = `
        <strong>${BOP_STRUCTURE.name}</strong><br>
        <small style="color: var(--text-muted)">Übersicht aller Transaktionen</small>
        <div class="badge-info">Details</div>
    `;
    headerNode.onclick = () => showInfo('root');
    root.appendChild(headerNode);

    // Create 4 Pillars Container
    const subNodesContainer = document.createElement('div');
    subNodesContainer.className = 'sub-nodes';
    root.appendChild(subNodesContainer);

    // Each child of BOP_STRUCTURE becomes a pillar
    BOP_STRUCTURE.children.forEach(child => {
        const pillar = document.createElement('div');
        pillar.className = 'node-group';

        const node = document.createElement('div');
        node.className = 'node';
        node.innerHTML = `
            <strong>${child.name}</strong><br>
            <div class="badge-info">Details</div>
        `;
        node.onclick = () => showInfo(child.id);
        pillar.appendChild(node);

        if (child.children) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'children-container';
            child.children.forEach(subChild => {
                const subNode = document.createElement('div');
                subNode.className = 'node';
                subNode.style.minWidth = '160px';
                subNode.innerHTML = `
                    <strong>${subChild.name}</strong><br>
                    <div class="badge-info">Details</div>
                `;
                subNode.onclick = () => showInfo(subChild.id);
                childrenContainer.appendChild(subNode);
            });
            pillar.appendChild(childrenContainer);
        }

        subNodesContainer.appendChild(pillar);
    });
}

// --- PHASE 1: QUIZ ---
function renderQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';

    QUIZ_QUESTIONS.forEach((q, idx) => {
        const card = document.createElement('div');
        card.className = 'question-card glass';
        card.innerHTML = `
            <p><strong>Fall ${idx + 1}:</strong> ${q.text}</p>
            <div class="options-grid" id="q-${idx}-options">
                <button class="secondary" data-cat="hb">Handelsbilanz</button>
                <button class="secondary" data-cat="db">Dienstleistung</button>
                <button class="secondary" data-cat="pe">Einkommensbilanz</button>
                <button class="secondary" data-cat="se">Übertragungsbilanz</button>
                <button class="secondary" data-cat="di">Direktinvestition</button>
                <button class="secondary" data-cat="wa">Portfolioinvest.</button>
                <button class="secondary" data-cat="vb">Vermögensänd.</button>
            </div>
            <div id="q-${idx}-feedback" style="margin-top: 1rem; font-weight: 600; display: none;"></div>
        `;
        container.appendChild(card);

        const buttons = card.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.onclick = () => {
                const feedbackDiv = document.getElementById(`q-${idx}-feedback`);
                feedbackDiv.style.display = 'block';

                if (btn.dataset.cat === q.category) {
                    btn.style.background = 'var(--success)';
                    feedbackDiv.innerText = q.feedback;
                    feedbackDiv.style.color = 'var(--success)';
                    checkQuizProgress();

                    const groupButtons = document.getElementById(`q-${idx}-options`).querySelectorAll('button');
                    groupButtons.forEach(b => b.disabled = true);
                } else {
                    btn.style.background = 'var(--error)';
                    feedbackDiv.innerText = "Nicht ganz. Schau dir die Definition oben nochmal an!";
                    feedbackDiv.style.color = 'var(--error)';
                }
            };
        });
    });
}

function checkQuizProgress() {
    const correctCount = document.querySelectorAll('button[style*="var(--success)"]').length;
    if (correctCount === QUIZ_QUESTIONS.length) {
        if (!document.getElementById('proceed-btn')) {
            const proceedBtn = document.createElement('button');
            proceedBtn.id = 'proceed-btn';
            proceedBtn.innerText = "🚀 Wissenstest bestanden! Zum Buchungs-Trainer";
            proceedBtn.style.width = '100%';
            proceedBtn.style.marginTop = '2rem';
            proceedBtn.style.padding = '1.5rem';
            proceedBtn.style.boxShadow = '0 10px 30px rgba(99,102,241,0.4)';
            proceedBtn.onclick = () => {
                switchToPhase(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };
            document.getElementById('quiz-container').appendChild(proceedBtn);
            proceedBtn.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// --- PHASE 2: BOOKING ---
function switchToPhase(phaseNum) {
    document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    document.getElementById(`phase-${phaseNum}`).classList.add('active');

    if (phaseNum === 2) {
        document.getElementById('app-subtitle').innerText = "Schritt 3: Praxis - Warum bleibt die Waage bei 0?";
        loadScenario(0);
        updateTAccounts();
    } else {
        document.getElementById('app-subtitle').innerText = "Schritt 1 & 2: Struktur und Wissenstest";
    }
}

function loadScenario(idx) {
    const s = BOOKING_SCENARIOS[idx];
    if (!s) return;

    document.getElementById('scenario-title').innerText = s.title;
    document.getElementById('scenario-event').innerText = s.event;
    document.getElementById('scenario-difficulty').innerText = "Szenario " + (idx + 1) + " von " + BOOKING_SCENARIOS.length;
    currentScenarioIdx = idx;

    // Reset selections
    document.getElementById('select-a').selectedIndex = 0;
    document.getElementById('type-a').selectedIndex = 0;
    document.getElementById('select-b').selectedIndex = 0;
    document.getElementById('type-b').selectedIndex = 0;
}

function updateTAccounts() {
    const container = document.getElementById('t-accounts-container');
    container.innerHTML = '';

    const allIds = ['hb', 'db', 'pe', 'se', 'vb', 'di', 'wa', 'sk', 'wr', 'rp'];
    const names = {
        hb: "Handelsbilanz", db: "Dienstleistungsbilanz", pe: "Einkommensbilanz", se: "Übertragungsbilanz",
        vb: "Vermögensänderung", di: "Direktinvest.", wa: "Portfolioinvest.", sk: "Sonstige Invest.", wr: "Währungsreserven", rp: "Restposten"
    };

    allIds.forEach(id => {
        const val = engine.balances[id];
        if (Math.abs(val) > 0) {
            const acc = document.createElement('div');
            acc.className = 'balance-card';
            acc.innerHTML = `
                <div class="t-account">
                    <div class="t-header">${names[id]}</div>
                    <div class="t-header-label">
                        <span>Minus (-)</span>
                        <span>Plus (+)</span>
                    </div>
                    <div class="t-side minus">${val < 0 ? Math.abs(val).toLocaleString() : 0} €</div>
                    <div class="t-side plus">${val > 0 ? val.toLocaleString() : 0} €</div>
                </div>
            `;
            container.appendChild(acc);
        }
    });

    const totals = engine.getTotals();
    const lbTotal = totals.lb + totals.vb;
    const kbTotal = totals.kb + (engine.balances['rp'] || 0);

    document.getElementById('val-lb').innerText = lbTotal.toLocaleString() + " €";
    document.getElementById('val-kb').innerText = kbTotal.toLocaleString() + " €";

    // Indicator removed as per user request (BoP is always balanced by definition)
    const balanceIndicator = document.getElementById('total-balance-status');
    if (balanceIndicator) balanceIndicator.style.display = 'none';
}

function setupEventListeners() {
    document.getElementById('btn-submit-booking').onclick = () => {
        const scenario = BOOKING_SCENARIOS[currentScenarioIdx];
        const selA = document.getElementById('select-a').value;
        const typeA = document.getElementById('type-a').value;
        const selB = document.getElementById('select-b').value;
        const typeB = document.getElementById('type-b').value;

        const isCorrectA = (selA === scenario.logic.sideA.bill && typeA === scenario.logic.sideA.type);
        const isCorrectB = (selB === scenario.logic.sideB.bill && typeB === scenario.logic.sideB.type);

        if (isCorrectA && isCorrectB) {
            // Engine logic
            const internalA = (typeA === "Plus") ? "Credit" : "Debit";
            const internalB = (typeB === "Plus") ? "Credit" : "Debit";

            engine.book(selA, internalA, scenario.logic.sideA.amount);
            engine.book(selB, internalB, scenario.logic.sideB.amount);
            updateTAccounts();

            if (currentScenarioIdx === 2) {
                alert("🎯 Korrekt! Das ist ein reiner Tausch innerhalb der Kapitalbilanz: Du gibst ein Guthaben (Geld) ab und erhältst dafür eine andere Anlage (z.B. Wertpapiere).");
            } else {
                alert("🎯 Super! Du hast den Zusammenhang korrekt erkannt.");
            }

            if (currentScenarioIdx < BOOKING_SCENARIOS.length - 1) {
                setTimeout(() => {
                    loadScenario(currentScenarioIdx + 1);
                }, 500);
            } else {
                alert("Großartig! Du hast alle Szenarien erfolgreich abgeschlossen. Du bist nun ein Zahlungsbilanz-Profi!");
            }
        } else {
            alert("Noch nicht ganz! Überleg mal:\n1. Welche Teilbilanz ist betroffen?\n2. Ist es ein Zufluss (+) oder Abfluss (-)?\n\n💡 Tipp: In der Zahlungsbilanz wird eine Zunahme deiner Forderungen oder Guthaben (Aktiva-Zunahme) in der Kapitalbilanz immer mit einem Minus (-) gebucht.");
        }
    };

    document.getElementById('btn-reset').onclick = () => {
        if (confirm("Wirklich alle Buchungen löschen?")) {
            engine.reset();
            updateTAccounts();
            loadScenario(0);
        }
    };

    document.getElementById('btn-back-to-step1').onclick = () => {
        switchToPhase(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}

function populateSelects() {
    const selects = document.querySelectorAll('.bill-select');
    const options = [
        { id: 'hb', name: 'Handelsbilanz' },
        { id: 'db', name: 'Dienstleistungsbilanz' },
        { id: 'pe', name: 'Einkommensbilanz (Primär.)' },
        { id: 'se', name: 'Übertragungsbilanz (Sekund.)' },
        { id: 'vb', name: 'Vermögensänderung' },
        { id: 'di', name: 'Kapital: Direktinvest.' },
        { id: 'wa', name: 'Kapital: Portfolioinvest.' },
        { id: 'sk', name: 'Kapital: Sonstige Invest.' },
        { id: 'wr', name: 'Kapital: Währungsreserven' },
        { id: 'rp', name: 'Restposten' }
    ];

    selects.forEach(select => {
        select.innerHTML = '';
        options.forEach(opt => {
            const o = document.createElement('option');
            o.value = opt.id;
            o.innerText = opt.name;
            select.appendChild(o);
        });
    });
}
