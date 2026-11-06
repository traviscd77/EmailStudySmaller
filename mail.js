/* Fictional study stimuli. Message-body destinations are inactive simulations. */
(() => {
  const emails = [
  {
    "id": "advising",
    "category": "legitimate",
    "sender": "Elena Brooks",
    "address": "ebrooks@mailbox.sc.edu",
    "initials": "EB",
    "color": "blue",
    "subject": "Your advising appointment: Wednesday at 10:30",
    "body": "<p>Hi Alex,</p><p>Your advising appointment is confirmed for Wednesday, October 28, at 10:30 a.m. in Student Services 214. We’ll review your planned spring courses and check prerequisite requirements.</p><p>Please look over your <a href=\"#\" data-destination=\"https://my.sc.edu/\" title=\"https://my.sc.edu/\">degree progress report</a> beforehand and bring any questions about registration.</p><p>If you need a different time, reply to this message and we’ll find another appointment.</p><p>Best,<br>Elena Brooks<br>Academic Advising | University of South Carolina</p>",
    "folder": "Inbox",
    "date": "2026-10-27T10:10:00",
    "label": "10:10 AM",
    "unread": true,
    "recipients": "Alex Morgan <amorgan@email.sc.edu>"
  },
  {
    "id": "campus-job",
    "category": "phishing",
    "difficulty": "medium",
    "sender": "Carolina Career Connections",
    "address": "careers@carolina-careers.org",
    "initials": "CC",
    "color": "blue",
    "subject": "Research assistant shortlist — availability needed by 2 p.m.",
    "body": "<section class=\"message-card\"><div class=\"message-brand neutral-brand\">Carolina Career Connections<span>Student employment opportunities</span></div><div class=\"message-card-content\"><p>Hi Alex,</p><p>We’re helping a faculty research team finalize its shortlist for a paid student assistant position. Your technology coursework appears to match the team’s needs.</p><p>The assistant will organize survey responses and check entries in a research database. The position is 6–8 hours per week at $17 per hour, with scheduling around classes.</p><p><strong>The team is setting interview times this afternoon.</strong> If you would like to be considered, review the position details and submit your availability by <strong>2:00 p.m. today</strong>.</p><p><a href=\"#\" data-destination=\"https://careers.sc.edu.student-applicant-services.com/positions/ra-241\" title=\"https://careers.sc.edu.student-applicant-services.com/positions/ra-241\" class=\"message-cta\">View position and submit availability</a></p><p>Select <em>University sign-in</em> and use your Carolina account to access the applicant workspace. The position description, supervisor information, and scheduling form are available there.</p><p>Best,<br>Carolina Career Connections<br>Student Employment | University of South Carolina</p><p class=\"message-reference\">Position reference: RA-241 · Fall 2026</p></div></section>",
    "folder": "Inbox",
    "date": "2026-10-27T10:35:00",
    "label": "10:35 AM",
    "unread": true,
    "recipients": "Alex Morgan <amorgan@email.sc.edu>"
  },
  {
    "id": "textbooks",
    "category": "spam",
    "sender": "BookLoop Campus Brief",
    "address": "deals@booklooprentals.com",
    "initials": "BS",
    "color": "purple",
    "subject": "Spring course materials: a short planning checklist",
    "body": "<section class=\"message-card\"><div class=\"message-brand newsletter-brand\">BookLoop Campus Brief<span>Practical notes for the next semester</span></div><div class=\"message-card-content\"><p class=\"message-eyebrow\">OCTOBER 27, 2026 · COURSE MATERIALS</p><p>Hi Alex,</p><p>As spring registration approaches, a little preparation can make it easier to budget for course materials.</p><ol class=\"newsletter-checklist\"><li>Check the required edition and ISBN before comparing prices.</li><li>Confirm whether your course needs a new access code; a used book may not include one.</li><li>Compare the total cost of buying, renting, and digital access, including return shipping.</li></ol><p>Our student rental guide brings those options together, with selected offers from participating sellers.</p><p><a href=\"#\" data-destination=\"https://booklooprentals.com/student-rentals\" title=\"https://booklooprentals.com/student-rentals\">Compare course material options</a></p><p>Some participating sellers are offering early rental rates through Friday. Availability and pricing depend on the title and edition.</p><p>The BookLoop team</p></div><div class=\"message-footer\">BookLoop Student Savings · Independent course materials marketplace<br>Commercial newsletter · Sponsored seller listings may appear in the guide. BookLoop is not affiliated with the university.<br><a href=\"#\" data-destination=\"https://booklooprentals.com/preferences\" title=\"https://booklooprentals.com/preferences\">Manage preferences or unsubscribe</a></div></section>",
    "folder": "Inbox",
    "date": "2026-10-27T10:15:00",
    "label": "10:15 AM",
    "unread": true,
    "recipients": "Alex Morgan <amorgan@email.sc.edu>",
    "difficulty": "hard"
  }
];
  const filename = location.pathname.split('/').pop();
  const index = emails.findIndex((email, i) => filename === `email-${String(i + 1).padStart(2, '0')}.html`);
  const selected = emails[index] || null;
  // Separate from the earlier ten-email exercise so old choices do not carry over.
  const storageKey = 'sample-mail-three-email-categories-v1';
  let choices = {}, storageAvailable = true;
  const categories = ['phishing', 'junk', 'deleted', 'keep'];
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      emails.forEach(email => { if (categories.includes(saved[email.id])) choices[email.id] = saved[email.id]; });
    }
  } catch { storageAvailable = false; }
  function persist() {
    try { localStorage.setItem(storageKey, JSON.stringify(choices)); }
    catch { storageAvailable = false; }
  }
  const get = selector => document.querySelector(selector);
  const status = get('#mail-status');
  const actions = {keep: get('#keep-email'), deleted: get('#delete-email'), phishing: get('#report-phishing'), junk: get('#report-junk')};
  function render() {
    const choice = selected ? choices[selected.id] : null;
    Object.entries(actions).forEach(([category, button]) => {
      button.disabled = !selected || choice === category;
      button.setAttribute('aria-pressed', String(!!selected && choice === category));
    });
    get('#deleted-banner').hidden = choice !== 'deleted';
    get('#keep-banner').hidden = choice !== 'keep';
    get('#report-banner').hidden = !['phishing', 'junk'].includes(choice);
    get('#report-confirmation').textContent = ['phishing', 'junk'].includes(choice) ? `Reported as ${choice}. ${storageAvailable ? 'Saved in this browser.' : 'Saved for this page visit only.'}` : '';
  }
  function categorize(category) {
    if (!selected) return;
    choices[selected.id] = category;
    persist();render();
    status.textContent = `Email ${index + 1}: ${category === 'deleted' ? 'moved to Deleted Items' : category === 'keep' ? 'kept' : `reported as ${category}`}.`;
  }
  Object.entries(actions).forEach(([category, button]) => button.addEventListener('click', () => categorize(category)));
  function undo() {
    if (!selected) return;
    delete choices[selected.id];persist();render();
    status.textContent = `Category cleared for Email ${index + 1}.`;
  }
  ['#restore-email', '#undo-keep', '#undo-report'].forEach(selector => get(selector).addEventListener('click', undo));
  get('#reset-reports').addEventListener('click', () => {
    choices = {};persist();render();
    status.textContent = 'All categories reset: Reported Phishing, Junk Email, Deleted Items, and Keep. All three emails are uncategorized.';
  });
  if (selected) {
    document.title = `Email ${index + 1} | Student Mail`;
    get('#message-position').textContent = `Email ${index + 1} of ${emails.length}`;
    get('#email-subject').textContent = selected.subject;
    const header = get('.email-header');header.hidden = false;
    header.querySelector('.avatar').className = `avatar ${selected.color}`;
    header.querySelector('.avatar').textContent = selected.initials;
    header.querySelector('strong').textContent = selected.sender;
    header.querySelector('.email-address').textContent = `<${selected.address}>`;
    header.querySelector('.recipients').textContent = `To: ${selected.recipients}`;
    header.querySelector('time').dateTime = selected.date;
    header.querySelector('time').textContent = new Intl.DateTimeFormat('en-US', {weekday:'short',month:'numeric',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'}).format(new Date(selected.date));
    get('.email-body').innerHTML = selected.body;
  }
  function keepLinkInactive(event) { if (event.target.closest('a')) event.preventDefault(); }
  get('.email-body').addEventListener('click', keepLinkInactive);
  get('.email-body').addEventListener('auxclick', keepLinkInactive);
  render();
})();
