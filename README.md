# Wanago

An interactive concert and sporting event discovery tool created with Rails, React, Google Maps and Firebase. The aim was to approach event discovery in an alternate manner, where users can find events by discovering nearby event venues, with an additional option to search for upcoming events traditionally. 

[Try the app on heroku](https://wanago.herokuapp.com/)

[Watch the web demo video](https://drive.google.com/file/d/12qu2_zha1RWnL_Z8Mt6vkRFB9HYNRV5h/view?usp=sharing)
[Watch the mobile demo video](https://drive.google.com/file/d/19sjj645fU5MhXs4MoIvDfZ2vk7fzx-Is/view?usp=sharing)

[Check out the backend code](https://github.com/patcarrasco/wanago-backend)

## Table of contents
* [Technologies](#technologies)
* [Web Screenshots](#web-screenshots)
* [Additional Notes](#additional-notes)

## Technologies
Created with:
* [React](https://reactjs.org/) - Front end interface
* [Redux](https://redux.js.org/) - State management
* [React-Router-Dom](https://www.npmjs.com/package/react-router-dom) - Page navigation 
* [Rails](https://rubyonrails.org/) - Save user credentials/information and references to event information
* [PostgreSQL](https://www.postgresql.org/) - Database
* [Firebase](https://firebase.google.com/) - Custom token authentication 
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Hash user credentials
* [JWT](https://jwt.io/) - Secure transfer of credentials
* [Semantic-UI](https://semantic-ui.com/) - CSS theming
* [Semantic-UI React](https://react.semantic-ui.com/) - Styled react components
* [Google Cloud](https://cloud.google.com/maps-platform/) - Location information, map, and user interactivity
* [Ticketmaster](https://developer.ticketmaster.com/)  - Event and venue information

## Web Screenshots

![wanago-landing](https://user-images.githubusercontent.com/39533889/56843037-f99a3b00-6869-11e9-96a9-305d4ddd85b6.png)

![wanago-home](https://user-images.githubusercontent.com/39533889/56843076-6dd4de80-686a-11e9-93c9-fc4f57b6a6c5.png)

![eventfeed](https://user-images.githubusercontent.com/39533889/56843098-b55b6a80-686a-11e9-81b8-7ed0410936e6.png)

## Additional Notes

The initial idea behind the app also includes User-User interaction, in that User's can post events onto a global feed, as well as a friend feed. The endpoints for these features are already built into the backend, and were available in v1 of this app. I'll be integrating that functionality in the future.

