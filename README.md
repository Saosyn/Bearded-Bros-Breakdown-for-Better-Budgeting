# Bearded Bros Budgeting

## Project Description
Bearded Bros Budgeting is a real-time expense tracking application that helps users understand their spending habits. Users can input each expense with a description, amount, and spending category. The app provides a detailed visual breakdown of expenses using a pie chart, helping users manage and optimize their monthly budget.

## User Story
As a user, I want to be able to track my daily expenses and monthly recurring charges so that I can analyze my spending habits and identify areas where I can improve my budgeting skills. I want to be able to easily navigate between categories, view my expenses in a visual format, and have a clear understanding of where my money is going.

## Acceptance Criteria for Project Goals
1. **Allow users to add daily expenses with a description, cost, and spending category**
   - Users should be able to enter the description, amount, and category for each expense via an input form.
   - Each expense entry should be saved to local storage to persist between sessions.
   - Users should be able to view, edit, and delete daily expenses.

2. **Include a summary of monthly recurring charges for better budgeting**
   - Users should see a predefined list of monthly recurring expenses like rent, utilities, and subscriptions.
   - The monthly charges section should allow editing or updating the recurring expenses.
   - The total monthly recurring charges should be calculated and displayed prominently.

3. **Display a pie chart to provide a visual representation of spending habits across various categories**
   - A pie chart should be rendered based on the user's daily and monthly expenses.
   - The pie chart should visually differentiate spending categories with distinct colors.
   - The pie chart should update dynamically when new expenses are added or edited.

4. **Enable users to navigate through different categories to view detailed expenses**
   - Users should be able to click on a navigation button to filter and view expenses by specific categories.
   - The application should provide a clear list of expenses for each category selected.
   - Users should be able to easily switch between categories using navigation buttons.

5. **Offer hover styles to highlight and show details about each spending category on the pie chart**
   - When hovering over a segment of the pie chart, a tooltip should appear showing the category name and total amount spent.
   - Hover effects should clearly highlight the segment of the pie chart being interacted with.
   - The hover details should provide insight into how much is spent in each category to improve user experience.

## Features
- **Daily Expense Tracker**: Add, edit, and delete daily expenses with description, amount, and category.
- **Monthly Recurring Charges**: Manage recurring expenses like rent, utilities, and subscription services.
- **Expense Summary**: View a summary of total expenses by category with a color-coded pie chart.
- **Category Navigation**: Navigate through different categories to view specific expenses.
- **Hover Details**: Highlight spending categories on the pie chart to display category names and total amounts.

## Technologies Used
- **HTML**: Semantic HTML for proper structuring and accessibility.
- **CSS**: Styling the interface for responsiveness, navigation buttons, forms, and hover effects.
- **JavaScript**: Adding dynamic features, such as expense input handling, pie chart visualization, and local storage to save user data.
- **Chart.js or D3.js**: Rendering the pie chart to display spending categories visually.

## Getting Started
### Prerequisites
To run the project locally, ensure you have:
- A modern web browser (e.g., Chrome, Firefox, Edge).
- A text editor (e.g., VS Code) for any changes or customizations.

### Installation
1. **Clone the Repository**:
   ```sh
   git clone https://github.com/Saosyn/Bearded-Bros-Breakdown-for-Better-Budgeting.git
   ```
2. **Navigate to Project Directory**:
   ```sh
   cd bearded-bros-budgeting
   ```
3. **Open in Browser**:
   Open `index.html` in your browser to view the application.

## Usage
1. **Add Daily Expenses**:
   - Navigate to the "Daily Expenses" tab.
   - Fill in the expense description, amount, and choose a category.
   - Click "Add Expense" to save the entry.
2. **View Monthly Recurring Charges**:
   - Navigate to the "Monthly Charges" tab to see a list of static recurring expenses.
3. **View Expense Summary**:
   - Navigate to the "Overview Chart" tab.
   - View your spending distribution across categories in a color-coded pie chart.
   - Hover over sections to see details of each category.

## Development Steps
1. **Define HTML Structure**: Use semantic elements like `<header>`, `<section>`, `<nav>`, and `<footer>` to organize content.
2. **Add CSS for Styling**: Define a consistent color palette and styles for buttons, form elements, and pie chart hover effects.
3. **Add JavaScript Functionality**:
   - Handle form submissions to store expense data.
   - Use local storage to save and load expenses.
   - Generate pie charts with category-wise spending.
4. **Testing**: Ensure responsiveness across different devices and cross-browser compatibility.

## Deployment
Deploy the project on platforms like GitHub Pages, Netlify, or Vercel for public access. For example, to deploy using GitHub Pages:
1. Commit and push all changes to your GitHub repository.
2. Go to repository settings.
3. Enable GitHub Pages from the "Pages" section by selecting the main branch.

## Future Enhancements
- **Custom Date Filters**: Users will be able to filter expenses based on a custom date range.
- **Budget Goals**: Users can set a monthly spending limit and receive alerts when they're close to exceeding it.
- **Spending Trend Analysis**: Provide insights into spending trends to help users improve their budgeting over time.

## Contributing
Pull requests are welcome. For major changes, please open an issue to discuss what you would like to change.

## License
This project is open-source and available under the MIT License.

## Contact
For questions or suggestions, feel free to reach out:
- **Email**: beardedbros@example.com
- **GitHub**: [YourGitHubProfile](https://github.com/yourusername)

