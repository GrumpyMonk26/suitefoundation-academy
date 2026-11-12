export const questions = [
  {
    id: 'fa001', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: false,
    question: 'Who typically manages the Pick, Pack, and Ship status for an item fulfillment?',
    options: ['Accounts Receivable Analyst', 'Sales Rep', 'Inventory Manager', 'Accounts Payable Analyst'], answer: 2,
    explanation: 'The Inventory Manager typically oversees inventory fulfilment activities, including Pick, Pack, and Ship.',
    optionExplanations: ['Accounts Receivable focuses on customer balances and collections.', 'Sales representatives manage sales relationships, not fulfilment status.', 'Correct. Inventory management is responsible for fulfilment operations.', 'Accounts Payable focuses on supplier liabilities and payments.']
  },
  {
    id: 'fa002', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: false,
    question: 'Which task in the Period Close Checklist prevents all roles from making changes that could impact the general ledger in a period?',
    options: ['Lock All', 'Allow Non-GL Changes Only', 'Close', 'Override Period Restriction'], answer: 2,
    explanation: 'The Close task closes the accounting period and prevents changes that could affect the general ledger, subject to period-close controls.',
    optionExplanations: ['Lock All is not the task identified in the supplied answer key.', 'This setting permits certain non-general-ledger changes.', 'Correct. Close is the task identified in the practice exam answer key.', 'Override Period Restriction is not the period-close task described.']
  },
  {
    id: 'fa003', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: false,
    question: 'What happens when you generate a cash refund from a credit memo?',
    options: ['The invoice balance decreases by the amount on the credit memo.', 'Your bank balance decreases by the amount on the credit memo.', 'A credit is applied to the customer invoice.', 'A debit is applied to the Undeposited Funds account.'], answer: 1,
    explanation: 'A cash refund pays money back to the customer, reducing the bank balance.',
    optionExplanations: ['This describes the effect of applying a credit memo to an invoice.', 'Correct. The cash refund reduces the bank balance.', 'Applying a credit memo is different from issuing a cash refund.', 'This is not the bank impact identified for a cash refund.']
  },
  {
    id: 'fa004', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: false,
    question: 'What is a difference between (1) creating a vendor credit from an open vendor bill and (2) creating a standalone vendor credit?',
    options: ['(1) Impacts the accounts payable balance, (2) has no impact on the accounts payable balance', '(1) Selects a vendor automatically, (2) requires no vendor', '(1) Applies the credit automatically, (2) applies the credit manually', '(1) Cannot be modified after it is created, (2) can be modified'], answer: 2,
    explanation: 'When a vendor credit is created from an open vendor bill, it is applied to that bill automatically; a standalone vendor credit must be applied manually.',
    optionExplanations: ['Both vendor credits affect accounts payable.', 'A vendor is required for a vendor credit.', 'Correct. The key difference is whether the credit is applied automatically or manually.', 'This is not the distinction described in the practice exam.']
  },
  {
    id: 'fa005', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: false,
    question: 'Which functionality allows for streamlined reporting so that you can track travel expenses across various locations?',
    options: ['Separate expense accounts', 'Expense categories', 'Segments', 'Budgets'], answer: 2,
    explanation: 'Segments such as locations can classify transactions and support reporting across different parts of the business.',
    optionExplanations: ['Separate accounts would create a less streamlined chart of accounts.', 'Expense categories classify expense types, not necessarily business locations.', 'Correct. Segments support classification and reporting across locations.', 'Budgets are used for planning and comparison, not the classification described.']
  },
  {
    id: 'fa006', domain: 'NetSuite Financial Associate', difficulty: 'Beginner', scenario: false,
    question: 'Which general ledger account type typically has a debit balance?',
    options: ['Credit Card', 'Deferred Expense', 'Other Income', 'Deferred Revenue'], answer: 1,
    explanation: 'A deferred expense is an asset account and typically carries a debit balance.',
    optionExplanations: ['Credit card balances are liabilities and typically have credit balances.', 'Correct. Deferred expense is an asset account with a typical debit balance.', 'Other income normally has a credit balance.', 'Deferred revenue is a liability and normally has a credit balance.']
  },
  {
    id: 'fa007', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: false,
    question: 'Which item type can be assigned to an Income Account? Select the best answer.',
    options: ['Inventory Item', 'Other Charge for Purchase', 'Non-Inventory Item for Purchase', 'Non-Inventory Item for Resale'], answer: 0,
    explanation: 'The practice exam identifies Inventory Item and Non-Inventory Item for Resale as valid choices. This single-answer practice version tests one of those valid item types.',
    optionExplanations: ['Correct. Inventory Items can be assigned an income account.', 'This is a purchase item type, not the resale income-account choice in the answer key.', 'This item type is used for purchases.', 'This is also identified as valid in the source answer key; the original question is multi-select.']
  },
  {
    id: 'fa008', domain: 'NetSuite Financial Associate', difficulty: 'Advanced', scenario: false,
    question: 'Which of the following scenarios cannot be achieved with fixed allocations?',
    options: ['Allocating from one account to multiple accounts', 'Allocating from multiple accounts', 'Allocating to specific segments with expense accounts', 'Allocating using statistical account balances'], answer: 3,
    explanation: 'The supplied practice exam answer key identifies allocation using statistical account balances as the scenario that cannot be achieved with fixed allocations.',
    optionExplanations: ['This is a typical allocation pattern.', 'Multiple source accounts can be included in allocation configurations.', 'Segments can be used to direct allocations.', 'Correct. This is the limitation identified in the practice exam answer key.']
  },
  {
    id: 'fa009', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: true,
    question: 'A sales manager wants to create a bundled item with a discounted price for two items. Which item type is the best option?',
    options: ['Discount item', 'Non-Inventory Item', 'Kit/Package', 'Item Group'], answer: 2,
    explanation: 'A Kit/Package combines multiple items into a single sellable offering, allowing the bundle to be priced as required.',
    optionExplanations: ['A discount item applies a discount but does not itself bundle the products.', 'A non-inventory item represents an item that is not tracked as inventory.', 'Correct. A Kit/Package is designed to bundle multiple items.', 'An Item Group groups items for transaction entry but is not the answer identified in the practice exam.']
  },
  {
    id: 'fa010', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: false,
    question: 'Which pricing option cannot be set on a Customer record?',
    options: ['Price Level', 'Group Pricing', 'Quantity Pricing', 'Item Pricing'], answer: 2,
    explanation: 'The supplied practice exam identifies Quantity Pricing as the option that cannot be set directly on a Customer record.',
    optionExplanations: ['Price Level can be associated with a customer.', 'Group Pricing can be used for customer pricing.', 'Correct. Quantity Pricing is the option identified by the answer key.', 'Item Pricing can be configured for a customer.']
  },
  {
    id: 'fa011', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: false,
    question: 'Which feature lets you record the general ledger impact of item purchases and expense charges across future periods?',
    options: ['Expense Allocation', 'Expense Amortization', 'Billing Schedules', 'Purchase Matching'], answer: 1,
    explanation: 'Expense Amortization spreads the accounting impact of qualifying expenses across future periods.',
    optionExplanations: ['Expense allocation distributes costs across accounts or dimensions.', 'Correct. Expense Amortization recognises expense over future periods.', 'Billing schedules control recurring or staged customer billing.', 'Purchase matching supports matching purchasing transactions.']
  },
  {
    id: 'fa012', domain: 'NetSuite Financial Associate', difficulty: 'Advanced', scenario: false,
    question: 'Which transaction type lets you transfer an expense from a parent company to child subsidiaries?',
    options: ['Journal Entry', 'Advanced Intercompany Journal Entry', 'Amortization Journal Entry', 'Intercompany Transfer'], answer: 1,
    explanation: 'An Advanced Intercompany Journal Entry supports accounting entries between subsidiaries, including parent and child subsidiaries.',
    optionExplanations: ['A standard journal entry does not provide the specific multi-subsidiary functionality described.', 'Correct. Advanced Intercompany Journal Entries support intercompany postings across subsidiaries.', 'An amortization journal entry records scheduled amortisation.', 'This is not the transaction type identified by the practice exam.']
  },
  {
    id: 'fa013', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: false,
    question: 'Which record can you allocate a budget to in NetSuite? Select the best answer.',
    options: ['Item', 'Vendor', 'Customer/Project', 'Expense Category'], answer: 0,
    explanation: 'The practice exam answer key identifies Item and Customer/Project as valid choices. This single-answer practice version tests one of those valid record types.',
    optionExplanations: ['Correct. Item is one of the valid choices in the source answer key.', 'Vendor is not one of the choices identified as valid in the answer key.', 'Customer/Project is also identified as valid in the source answer key; the original question is multi-select.', 'Expense Category is not one of the choices identified as valid in the answer key.']
  },
  {
    id: 'fa014', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: true,
    question: 'A company has two separate, yet related, businesses sharing a NetSuite account. How do you track the financials to allow for both separate and consolidated reporting?',
    options: ['Subsidiaries', 'Multi-Book', 'Separate roles', 'Departments'], answer: 0,
    explanation: 'Subsidiaries allow related legal entities to maintain separate financials while supporting consolidated reporting in OneWorld.',
    optionExplanations: ['Correct. Subsidiaries represent the separate businesses and support consolidation.', 'Multi-Book supports multiple accounting books, not separate legal entities in this scenario.', 'Roles control user access, not entity-level financial reporting.', 'Departments classify transactions for management reporting.']
  },
  {
    id: 'fa015', domain: 'NetSuite Financial Associate', difficulty: 'Beginner', scenario: false,
    question: 'Which page creates the hierarchy for all accounting periods?',
    options: ['Bank Reconciliation', 'Manage Accounting Periods', 'Accounting Preferences', 'Manage Tax Periods'], answer: 1,
    explanation: 'Manage Accounting Periods is used to create and manage the accounting period structure.',
    optionExplanations: ['Bank Reconciliation matches bank activity to recorded transactions.', 'Correct. Manage Accounting Periods is the page identified by the answer key.', 'Accounting Preferences controls accounting behaviour and defaults.', 'Manage Tax Periods is for tax-period administration.']
  },
  {
    id: 'fa016', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: false,
    question: 'What must you select first to receive recurring Saved Search results?',
    options: ['Send Emails According to Schedule', 'Send Email Alerts When Records are Created', 'Summarize Scheduled Emails', 'Allow Users to Subscribe'], answer: 0,
    explanation: 'The saved search must be configured to send emails according to a schedule to deliver recurring results.',
    optionExplanations: ['Correct. This enables scheduled saved search email delivery.', 'This relates to alerts when records are created, not recurring scheduled results.', 'This is not the initial setting identified by the answer key.', 'Subscription permissions do not replace the scheduled email setting.']
  },
  {
    id: 'fa017', domain: 'NetSuite Financial Associate', difficulty: 'Beginner', scenario: false,
    question: 'Which account is not included in the Balance Sheet?',
    options: ['Undeposited Funds', 'Cost of Goods Sold', 'Accounts Receivable', 'Raw Materials Inventory'], answer: 1,
    explanation: 'Cost of Goods Sold is an income statement expense account, not a balance sheet account.',
    optionExplanations: ['Undeposited Funds is an asset account.', 'Correct. Cost of Goods Sold is reported on the income statement.', 'Accounts Receivable is an asset account.', 'Raw Materials Inventory is an asset account.']
  },
  {
    id: 'fa018', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: false,
    question: 'What can you modify in a financial report using the Column field at the bottom of the screen?',
    options: ['Department', 'Sorting', 'Show Zeros', 'Show Currency Symbol'], answer: 0,
    explanation: 'The Column field can be used to change the report column breakdown, such as by Department.',
    optionExplanations: ['Correct. Department is a report column dimension.', 'Sorting controls the order of report rows or columns.', 'Show Zeros controls whether zero-value rows or columns appear.', 'Show Currency Symbol controls currency display.']
  },
  {
    id: 'fa019', domain: 'NetSuite Financial Associate', difficulty: 'Advanced', scenario: true,
    question: 'The CFO requests that the Income Statement be grouped by department. If the report is currently grouped by account, which row or section of the financial report layout must be modified?',
    options: ['Formula Row', 'Financial Section', 'Reference Row', 'Text Row'], answer: 1,
    explanation: 'The Financial Section controls the financial report grouping structure identified in the practice exam.',
    optionExplanations: ['Formula Rows calculate values within a report layout.', 'Correct. Modify the Financial Section to change the grouping from account to department.', 'Reference Rows refer to other report rows or values.', 'Text Rows display labels or explanatory text.']
  },
  {
    id: 'fa020', domain: 'NetSuite Financial Associate', difficulty: 'Intermediate', scenario: false,
    question: 'An invoice transaction search shows one summary row per invoice. Which Saved Search setting causes this?',
    options: ['Sort By = Order Type', 'Main Line = Yes', 'Summary Rows = False', 'Show Totals = True'], answer: 1,
    explanation: 'Main Line = Yes returns the main transaction line, producing one row per transaction rather than separate item-line results.',
    optionExplanations: ['Sorting by order type changes sort order, not transaction row granularity.', 'Correct. Main Line = Yes returns one main row per invoice.', 'This is not the setting identified by the answer key.', 'Show Totals affects totals display, not one-row-per-invoice behaviour.']
  }
]
