================================================================================
                    UI COMPONENTS DOCUMENTATION
================================================================================

This folder contains all reusable UI components organized by category. Each
component is modular, styled with SCSS modules, and designed to work seamlessly
across the application.

================================================================================
                           CARDS CATEGORY
================================================================================

📦 ProjectCard
Location: ./cards/projectCard/ProjectCard.jsx
Purpose: Displays a project card with project information, statistics, and metadata
Props:
  - name: string - Project name
  - owner: string - Project owner
  - description: string - Brief project description
  - language: string - Primary programming language
  - stars: number - Star count
  - forks: number - Fork count
Usage:
  <ProjectCard 
    name="CornHub"
    owner="YoussefElhamouly"
    description="Social media for developers"
    language="JavaScript"
    stars={4}
    forks={0}
  />

================================================================================
                        COLLECTION CATEGORY
================================================================================

📋 ActivityList
Location: ./collection/activityList/ActivityList.jsx
Purpose: Renders a list of activities/events in chronological order
Props:
  - activities: array - Array of activity objects
  - className: string - Optional CSS class
Usage:
  <ActivityList 
    activities={[
      { id: 1, message: "Pushed to main", timestamp: "2 hours ago" },
      { id: 2, message: "Created new issue", timestamp: "1 day ago" }
    ]}
  />

📁 Item
Location: ./collection/item/Item.jsx
Purpose: Displays a file/folder item with icon and name, supports status coloring
Props:
  - name: string - File or folder name
  - type: string - Type of item ("folder", "file", "file-added", "file-minus", "file-modified")
  - className: string - Optional CSS class
Details:
  Types map to colors:
  - "folder" -> gray folder icon
  - "file" -> default file icon
  - "file-added" -> green (added file)
  - "file-minus" -> red (deleted file)
  - "file-modified" -> orange (modified file)
Usage:
  <Item name="src" type="folder" />
  <Item name="main.jsx" type="file" />
  <Item name="style.scss" type="file-modified" />

================================================================================
                        CONTROL CATEGORY
================================================================================

🔘 Button
Location: ./control/button/Button.jsx
Purpose: Versatile button component supporting multiple variants and icons
Props:
  - variant: string - Button style variant (default: "workSpace")
  - title: string - Button text
  - icon: component - Lucide icon component to display
  - onClick: function - Click handler
  - customStyles: object - Inline styles
  - className: string - Additional CSS classes
  - children: React node - Content inside button
Usage:
  <Button 
    variant="primary"
    title="Submit"
    icon={SaveIcon}
    onClick={() => console.log("clicked")}
  />
  <Button variant="transparent" title="Cancel" />

📊 Dropdown
Location: ./control/dropdown/Dropdown.jsx
Purpose: Dropdown menu for selecting from predefined options
Props:
  - title: string - Display title
  - icon: component - Icon to show
  - options: array - Array of { displayName, value } objects
  - defaultValue: string - Default selected value
  - buttonStyle: object - Inline styles for button
  - onChange: function - Callback when selection changes
Usage:
  <Dropdown
    title="Select Branch"
    options={[
      { displayName: "main", value: "main" },
      { displayName: "develop", value: "develop" }
    ]}
    defaultValue="main"
    onChange={(value) => console.log(value)}
  />

🔍 Filter
Location: ./control/filter/Filter.jsx
Purpose: UI filter bar for filtering content with multiple options/tags
Props:
  - options: array - Array of filter options { value, displayName, default }
  - className: string - Optional CSS class
  - onFilterChange: function - Callback when filter selection changes
Usage:
  <Filter
    options={[
      { value: "all", displayName: "All", default: true },
      { value: "active", displayName: "Active", default: false },
      { value: "archived", displayName: "Archived", default: false }
    ]}
    onFilterChange={(selected) => console.log(selected)}
  />

⌨️ InputField
Location: ./control/inputField/InputField.jsx
Purpose: Text input field with customizable placeholder and styling
Props:
  - placeholder: string - Input placeholder text
  - value: string - Current input value
  - onChange: function - Change handler
  - type: string - Input type (default: "text")
  - className: string - Optional CSS class
  - customStyles: object - Inline styles
Usage:
  <InputField
    placeholder="Enter your name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

📝 Menu
Location: ./control/menu/Menu.jsx
Purpose: Dropdown menu component with icon and title
Props:
  - title: string - Menu title
  - icon: component - Icon to display
  - leftIcon: component - Icon positioned on the left
  - wrapperStyle: object - Styles for wrapper
  - buttonStyle: object - Styles for button
  - children: React node - Menu items/content
Usage:
  <Menu icon={PlusIcon} title="Add">
    <MenuOption>New Project</MenuOption>
    <MenuOption>Import</MenuOption>
  </Menu>

🔎 SearchBar
Location: ./control/searchBar/SearchBar.jsx
Purpose: Search input component for filtering/searching content
Props:
  - placeHolder: string - Placeholder text
  - value: string - Current search value
  - onChange: function - Change handler
  - customStyles: object - Inline styles
  - className: string - Optional CSS class
Usage:
  <SearchBar
    placeHolder="Search repositories..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

📅 DatePicker
Location: ./control/datePicker/DatePicker.jsx
Purpose: Calendar date picker component using Menu, Button, and icon components
Props:
  - selectedDate: Date - Currently selected date (optional)
  - onChange: function - Callback when date is selected
  - placeholder: string - Placeholder text when no date selected (default: "Select date")
  - format: string - Date format (default: "MM/DD/YYYY")
  - minDate: string/Date - Minimum selectable date
  - maxDate: string/Date - Maximum selectable date
  - disabledDates: array - Array of date strings ("YYYY-MM-DD") to disable
  - showMonthYear: boolean - Show month/year navigation (default: true)
  - className: string - Optional CSS class
  - buttonStyle: object - Custom button styles
  - wrapperStyle: object - Custom wrapper styles
Features:
  - Full calendar view with month/year navigation
  - Today highlighting
  - Selected date highlighting in green (#22c55e)
  - Date range validation (min/max dates)
  - Ability to disable specific dates
  - Customizable date format
  - Integrates with Menu component for dropdown behavior
Usage:
  <DatePicker
    selectedDate={new Date()}
    onChange={(date) => setSelectedDate(date)}
    placeholder="Pick a date"
    format="DD/MM/YYYY"
    minDate="2024-01-01"
    maxDate="2024-12-31"
    disabledDates={["2024-01-01", "2024-07-04"]}
  />
  
  // Advanced usage with date range
  const [startDate, setStartDate] = useState(null);
  <DatePicker
    selectedDate={startDate}
    onChange={setStartDate}
    minDate={new Date()}
    placeholder="Select start date"
  />

================================================================================
                        FEEDBACK CATEGORY
================================================================================

💀 Skeleton
Location: ./feedback/skeleton/Skeleton.jsx
Purpose: Loading skeleton component for placeholder animations
Props:
  - width: string/number - Width of skeleton
  - height: string/number - Height of skeleton
  - className: string - Optional CSS class
Usage:
  <Skeleton width="100%" height="20px" />

================================================================================
                        LAYOUT CATEGORY
================================================================================

👁️ ContentViewer
Location: ./layout/contentViewer/ContentViewer.jsx
Purpose: Container component for displaying main content with optional header/footer
Props:
  - className: string - Optional CSS class
  - children: React node - Content to display
Sub-components:
  - ContentViewer.Header - Header section
  - ContentViewer.Body - Main content area
  - ContentViewer.Footer - Footer section
Usage:
  <ContentViewer>
    <ContentViewer.Header>
      <h2>Title</h2>
    </ContentViewer.Header>
    <ContentViewer.Body>
      <p>Main content here</p>
    </ContentViewer.Body>
  </ContentViewer>

🪟 Modal
Location: ./layout/modal/Modal.jsx
Purpose: Modal dialog component for focused user interactions
Props:
  - title: string - Modal title
  - onClose: function - Close handler
  - className: string - Optional CSS class
  - children: React node - Modal content
Usage:
  <Modal 
    title="Confirm Action"
    onClose={() => setShowModal(false)}
  >
    <p>Are you sure you want to delete this?</p>
  </Modal>

📊 Table
Location: ./layout/table/Table.jsx
Purpose: Data table component with customizable columns and rendering
Props:
  - columns: array - Array of column definitions { key, render? }
  - data: array - Array of row data objects
  - className: string - Optional CSS class
Details:
  - render is optional custom renderer function for cells
  - Returns null if no data or columns provided
Usage:
  <Table
    columns={[
      { key: "name" },
      { key: "email", render: (val) => <a href={`mailto:${val}`}>{val}</a> },
      { key: "status" }
    ]}
    data={[
      { name: "John", email: "john@example.com", status: "Active" },
      { name: "Jane", email: "jane@example.com", status: "Active" }
    ]}
  />

================================================================================
                        MEDIA CATEGORY
================================================================================

👤 Avatar
Location: ./media/avatar/Avatar.jsx
Purpose: User avatar component with customizable size and source
Props:
  - src: string - Image URL
  - alt: string - Alternative text
  - size: string - Avatar size ("sm", "md", "lg", etc.)
  - className: string - Optional CSS class
Usage:
  <Avatar 
    src="https://example.com/avatar.jpg"
    alt="User name"
    size="md"
  />

🎨 Icon
Location: ./media/icon/Icon.jsx
Purpose: Wrapper for Lucide React icons
Props:
  - icon: component - Lucide icon component
  - size: string/number - Icon size
  - color: string - Icon color
  - className: string - Optional CSS class
Usage:
  import { GitBranch } from "lucide-react";
  <Icon icon={GitBranch} size={24} color="#22c55e" />

🖼️ Picture
Location: ./media/picture/Picture.jsx
Purpose: Image component with fallback and lazy loading
Props:
  - src: string - Image URL
  - alt: string - Alternative text
  - className: string - Optional CSS class
  - width: string/number - Image width
  - height: string/number - Image height
Usage:
  <Picture 
    src="project-banner.jpg"
    alt="Project Banner"
    width="100%"
  />

📖 ReadMe
Location: ./media/readMe/ReadMe.jsx
Purpose: Markdown renderer for displaying README content
Props:
  - title: string - Section title
  - content: string - Markdown content to render
  - className: string - Optional CSS class
Usage:
  <ReadMe 
    title="README"
    content={markdownContent}
  />

📄 ShowMoreText
Location: ./media/showMoreText/ShowMoreText.jsx
Purpose: Text component that truncates and shows "Show More" toggle
Props:
  - text: string - Text content to display
  - maxLength: number - Character limit before truncation
  - className: string - Optional CSS class
Usage:
  <ShowMoreText 
    text="This is a long description..."
    maxLength={100}
  />

🎞️ Slider
Location: ./media/slider/Slider.jsx
Purpose: Image/content carousel/slider component
Props:
  - items: array - Array of items to slide through
  - autoplay: boolean - Enable autoplay
  - interval: number - Autoplay interval in ms
  - className: string - Optional CSS class
Usage:
  <Slider
    items={[imageUrl1, imageUrl2, imageUrl3]}
    autoplay={true}
    interval={3000}
  />

🎥 Video
Location: ./media/Video/Video.jsx
Purpose: Video player component
Props:
  - src: string - Video URL
  - controls: boolean - Show video controls
  - autoplay: boolean - Autoplay video
  - className: string - Optional CSS class
Usage:
  <Video 
    src="video.mp4"
    controls={true}
  />

================================================================================
                        NAVIGATION CATEGORY
================================================================================

🔗 Breadcrumb
Location: ./navigation/breadcrumb/Breadcrumb.jsx
Purpose: Navigation breadcrumb showing current path
Props:
  - items: array - Array of breadcrumb items { label, path }
  - className: string - Optional CSS class
Usage:
  <Breadcrumb
    items={[
      { label: "Home", path: "/" },
      { label: "Projects", path: "/projects" },
      { label: "Current", path: "/projects/current" }
    ]}
  />

🔀 NavLink
Location: ./navigation/navLink/NavLink.jsx
Purpose: Navigation link with active state detection and multiple variants
Props:
  - path: string - Route path
  - variant: string - Style variant ("secondary" or "drawer")
  - displayName: string - Link text
  - icon: component - Lucide icon
  - className: string - Optional CSS class
  - tabIndex: number - Tab index for keyboard navigation
  - onClick: function - Click handler
Details:
  - Automatically detects active state including query parameters
  - Secondary variant: horizontal navbar style
  - Drawer variant: sidebar/drawer style
Usage:
  <NavLink
    path="/project/code"
    variant="secondary"
    displayName="Code"
    icon={CodeIcon}
    tabIndex={0}
  />

🌳 TreeNode
Location: ./navigation/treeNode/TreeNode.jsx
Purpose: Tree node component for hierarchical file/folder navigation
Props:
  - label: string - Node label
  - icon: component - Lucide icon
  - children: array - Child nodes
  - onSelect: function - Selection handler
  - expanded: boolean - Expansion state
Usage:
  <TreeNode
    label="src"
    icon={FolderIcon}
    expanded={true}
  >
    <TreeNode label="components" icon={FolderIcon} />
    <TreeNode label="pages" icon={FolderIcon} />
  </TreeNode>

================================================================================
                        VISUALIZATION CATEGORY
================================================================================

📈 ContributionGraph
Location: ./visualization/contributionGraph/ContributionGraph.jsx
Purpose: GitHub-style contribution graph showing activity over time
Props:
  - data: array - Array of contribution data
  - year: number - Year to display
  - className: string - Optional CSS class
Usage:
  <ContributionGraph
    data={contributionData}
    year={2024}
  />

================================================================================
                           NOTES
================================================================================

- All components use SCSS modules for styling (componentName.module.scss)
- Icons are primarily from lucide-react library
- Props are designed to be flexible and intuitive
- Most components accept className and customStyles for customization
- Components are React 18+ compatible
- Styled to maintain visual consistency across the application
- Each component is self-contained and reusable

================================================================================
