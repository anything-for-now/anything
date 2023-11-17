# Software Requirements

## Vision

The vision of the Lost Hub App is to revolutionize the way lost items are reported and retrieved by offering a seamless, user-friendly digital platform. It aims to streamline the cumbersome process of traditional lost and found systems, providing a centralized hub for users to efficiently report their lost belongings and easily locate items they've found. This project addresses the pain point of inconvenience and inefficiency in conventional lost and found processes, offering a more accessible and modern solution. Users should care about this product because it simplifies the often frustrating experience of losing or finding items, enhancing the overall efficiency and user experience in managing lost belongings through a convenient and centralized digital interface.

## Scope (In/Out)

### IN - What will your product do:

1. **Location Based Data**: Leverage location-based data to enhance the search and retrieval process, allowing users to filter lost and found items based on geographic proximity.
2. **Found/Lost Matching Algorithm**: Employ a sophisticated matching algorithm to analyze and compare reported lost and found items, ensuring accurate and efficient connections between users who have lost items and those who have found them. 
3. **Matched Users Discussions/Notes**: Once a match is made, the app will facilitate communication between matched users through a discussion and notes feature, enabling them to coordinate the details of the item's retrieval securely.
4. **User Registration**: To utilize the full range of features, users will be required to register on the platform, providing a secure and personalized environment for reporting, searching, and retrieving lost items.
5. **Data Pesistence**: The app will ensure data persistence, storing user information, reported lost and found items, and communication histories securely to maintain a comprehensive record and facilitate future interactions.

### OUT - What will your product not do:

1. **Advanced Messsaging**: This project will not a real time messaging chat feature.
2. **Advanced User Roles**: It will not implement complex user roles beyond basic user and admin.

## Minimum Viable Product (MVP)

The MVP functionality will include:

1. Basic user registration and login.
2. List found item(s) with proper descriptions
3. Search lost item(s) based on item descriptions
4. Discussion box between matched founder and searcher
5. User (founder) can see a map with his/her found item(s)

## Stretch Goals

Stretch goals for this project may include:

1. Profile picture - Ability to upload a user profile picture
2. Payment - Searcher pays for additional search items
3. Mobile App version - create a mobile application for more user reach
   
## Functional Requirements

Functional requirements include tasks such as:

1. Users can register and create accounts
2. Users can log in and log out.
3. Users (searchers) can list their lost item(s).
4. Users (founders) can list their found item(s).
5. Users (founders) can see listed found item(s) on a map.
6. Users (searcher and founders) can discuss about an item if searcher's list matches with founder's listed item.

## Data Flow

1. User registers and logs in (AWS account).
2. User sends a message.
3. The message is received by AI for toxicity check.
4. The message is stored in the database.
5. The message is delivered in real-time to the recipient.
6. Messages are logged for reference and history.
7. If flagged by AI, administrators are notified in the private chatroom.

## Non-Functional Requirements

1. **Security**: The application will include authentication and authorization. The application ensures only authorized users can report, search, and engage in discussions about lost and found items, maintaining the integrity and privacy of the platform.

2. **Compatibility**: The application is designed with mobile responsiveness, ensuring a seamless and user-friendly experience across various devices. Whether accessed on a desktop, tablet, or smartphone, the platform's responsive design adapts to different screen sizes, providing consistent functionality and accessibility for users on the go.
