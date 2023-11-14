# MERN_STACK_PROJ. :rocket:

## Application Description

A commercial _FullStack JavaScript_ application in early development, building upon the _MERN stack_ mainly with _React_ (+ _Redux_ state management) on the client side and _ExpressJS_ backend server providing API end points on Node.js for data management between the client and _MongoDB_ database with the NPM _Mongoose_ package (a popular Object Data Modeling (ODM) library) for authenticated data transfer between the backend server and MongoDB database.

Also I make use of a lot of different packages but only if they are complementary and necessary, I feel like less is more using external packages in my application because I plan on making the application as stable and independent possible from external packages and sources (with updates).

> **Note:** The exact business plan I have in mind for this application will remain secret, but if you read trough the [Visual Demo](#visual-demo) section then you will have a general idea about the size of this project where this application is all about. I hope my idea will eventually start to snowball and turn in to something real, I dare to dream about that and to pursue a goal still far away, but it's a guarantee that I will grow in the process and that makes it worth to work on it either way.

## Table of Contents

- [MERN\_STACK\_PROJ. :rocket:](#mern_stack_proj-rocket)
  - [Application Description](#application-description)
  - [Table of Contents](#table-of-contents)
  - [Visual Demo](#visual-demo)
    - [Homepage](#homepage)
    - [Profile page (with gender specific placeholder profile picture)](#profile-page-with-gender-specific-placeholder-profile-picture)
    - [Profile picture upload modal](#profile-picture-upload-modal)
    - [Profile picture preview before upload](#profile-picture-preview-before-upload)
      - [BLOB image:](#blob-image)
      - [Save image to the backend server](#save-image-to-the-backend-server)
      - [Express.static() as CDN](#expressstatic-as-cdn)
    - [User profile page and data structure](#user-profile-page-and-data-structure)
      - [`User` schema:](#user-schema)
    - [Companies](#companies)
      - [Listing page](#listing-page)
      - [Registration](#registration)
      - [Form field validation:](#form-field-validation)
        - [KVK number validation:](#kvk-number-validation)
      - [`Company` document data structure](#company-document-data-structure)
      - [`Company` schema:](#company-schema)
      - [Edit company](#edit-company)
      - [Company ownership](#company-ownership)
      - [`Invite` schema:](#invite-schema)
  - [Get up and running:](#get-up-and-running)
  - [Versions](#versions)
    - [v0.0.3](#v003)
      - [Find other users for co-ownership with search field](#find-other-users-for-co-ownership-with-search-field)
      - [Send invites to invite other users to get company co-owner](#send-invites-to-invite-other-users-to-get-company-co-owner)
    - [v0.0.2](#v002)
    - [Backend server CDN for static files](#backend-server-cdn-for-static-files)
    - [File upload](#file-upload)
    - [v0.0.1](#v001)
    - [Registering an Account](#registering-an-account)
    - [Logging In](#logging-in)
  - [Company Registration and Ownership](#company-registration-and-ownership)
    - [How to Register a Company](#how-to-register-a-company)
    - [How to add a co-owner to a company](#how-to-add-a-co-owner-to-a-company)
  - [Project Issue Progression](#project-issue-progression)
  - [Technologies](#technologies)
  - [Frontend](#frontend)
    - [React](#react)
    - [Redux](#redux)
    - [Vite.js](#vitejs)
  - [Backend](#backend)
    - [Express.js](#expressjs)
      - [Efficient Routing](#efficient-routing)
      - [Middleware Support](#middleware-support)
      - [Streamlined Database Interactions](#streamlined-database-interactions)
      - [Asynchronous Request Handling](#asynchronous-request-handling)
      - [Cross-Origin Resource Sharing (CORS)](#cross-origin-resource-sharing-cors)
    - [MongoDB and Mongoose](#mongodb-and-mongoose)
      - [Many-to-Many Relationships](#many-to-many-relationships)
    - [Secure User Authentication with JWT](#secure-user-authentication-with-jwt)
      - [Stateless Nature](#stateless-nature)
      - [Data Integrity and Confidentiality](#data-integrity-and-confidentiality)
      - [Cross-Origin Resource Sharing (CORS) Support](#cross-origin-resource-sharing-cors-support)
      - [Granular Permissions](#granular-permissions)
      - [Easy Integration with Frontend Frameworks](#easy-integration-with-frontend-frameworks)
      - [Expiration and Refresh Tokens](#expiration-and-refresh-tokens)
      - [Conclusion](#conclusion)
    - [ES Lint](#es-lint)
      - [Frontend config:](#frontend-config)
      - [Backend config:](#backend-config)
    - [Prettier code formatter](#prettier-code-formatter)
  - [Project management](#project-management)
    - [Jira](#jira)

## Visual Demo

> **Note:** A video demonstration is in the making showing the application function in moving image. Also I will explain about the application more deeply like functionalities I build, strategy, choices, coding practices and about technologies I've been using. So come back later to check it out!

Get a general impression of my application.

> **Note:** This demo is interesting, but incomplete and not final. Also it is impossible to keep this demo completely up to date with the development progress. The main purpose is to give a general impression of the application. For complete understanding of the technical workings of each component of the application you're free to look into the source code and for any remaining questions you can ask me anything in a mail to [thompoppins@gmail.com](mailto:thompoppins@gmail.com).

### Homepage

**Homepage when user is logged in, will be a working search engine for finding professional people with an expertise.**

![Homepage Search Engine](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/001.png?raw=true)

### Profile page (with gender specific placeholder profile picture)

**When you register an account your profile is very empty and your profile picture is a placeholder, a male for men and for women a female picture placeholder.**

![Profile Page Placeholder Profile Picture](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/002.png?raw=true)

### Profile picture upload modal

**After logging in for the first time, users can click on the`upload` button on the placeholder profile picture for uploading their first profile picture. After clicking the button, a modal will pop up where you can upload a image file by clicking on the `browse...` button and select an image locally from their device.**

![Image Upload Modal Pop-Up](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/003.png?raw=true)

### Profile picture preview before upload

**After selecting a image local from their device, a preview will be shown of what image it would be.**

![Profile Picture Modal Preview](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/004.png?raw=true)

If the user wants can he/she still change their mind and choose a different one or cancel the upload because the image is not yet uploaded. The image preview is a Base64 binary image **BLOB** file in the browser memory.

#### BLOB image:

> **Definition:** A binary large object (BLOB or blob) is a collection of binary data stored as a single entity. Blobs are typically images, audio or other multimedia objects, though sometimes binary executable code is stored as a blob.

The Base64 BLOB image is converted from the image file value in the form data and then the string is set to be the `src` value of the preview `img`.

```javascript
<img src={blobValueString} />
```

> **Source:** [/frontend/src/components/users/EditProfilePicture.jsx](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/frontend/src/components/users/EditProfilePictureModal.jsx)

```javascript
// Modal to edit user profile picture
const EditProfilePictureModal = ({ userId, onClose }) => {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState('')

  // Handle file select
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined)
      return
    }

    setSelectedFile(e.target.files[0])
  }

  // Set the preview image
  useEffect(() => {
    if (!selectedFile) {
      setPreview('')
      return
    }
    // Convert the selected image to a Base64 string and save it to the preview state
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // Free memory when the preview is closed
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  // ... (rest of the component before it's return statement)

  return (

  // ... (start return JSX)

  {selectedFile ? <img
    alt="Profile Picture"
    className="mx-auto my-4 w-[350px] h-[350px] object-cover"
    src={preview} // BLOB image string is set as img src as is.
  /> : null}

  // ... (end return JSX)

  )
}

export default EditProfilePictureModal
```

#### Save image to the backend server

If the user is sure about it, he/she will click the upload button and now the image will be sent through a form-data object to the backend REST (ExpressJS hosted) POST image upload API end-point, where the image will be recieved by _ExpressJS_, using _Multer_ middleware for disk storage configuration and file handling and saved in a special public static file directory, local on the server storage.

After the image is uploaded and saved, a corresponding Image "document" (entry) with a filepath will be saved to the MongoDB database in the "images" collection. (A collection is like a database table.)

> **Source:** [/backend/routes/uploadRoute.js](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/backend/routes/uploadRoute.js)

```javascript
import { Image } from '../models/imageModel.js'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

const router = express.Router()

// Create Multer storage configuration
const storage = multer.diskStorage({
  // `destination` is the folder where the uploaded file will be stored.
  destination(request, file, callback) {
    callback(null, './public/uploads/images')
  },

  fileFilter(request, file, callback) {
    // Accept images only.
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      // Send status 400 response if the file is not an image and a (error) message to inform the client.
      return callback(new Error('Only images allowed!'))
    }
    // Image file is accepted. Pass `true` to the callback.
    callback(null, true)
  },

  // Filename is the name of the uploaded file.
  filename(request, file, callback) {
    // The file name will be the original name of the uploaded file with a timestamp.
    const fileName = file.originalname.split('.')[0]
    const fileExtension = file.originalname.split('.')[1]
    const timestamp = Date.now()
    // `callback` is used to pass the file name to multer.
    callback(null, `${fileName}-${timestamp}.${fileExtension}`)
  },
})

// Create multer instance with the storage configuration.
const upload = multer({ storage })

// The POST image upload route uses Multer middleware as you can see, the Multer object is provided as second argument.
// Multer will first process the request and pass on the result to the 3rd argument function of the route
router.post('/image', upload.single('image'), async (request, response) => {
  if (!request.file) {
    console.log('No image file. `request`: ', request)

    return response.status(400).send({
      message: 'No image uploaded.',
    })
  }

  // Prepare response object to send to client with image path and database Image._id.
  const responseObj = {
    message: 'Image uploaded successfully!',
    imagePath: request.file.path,
    imageId: new mongoose.Types.ObjectId(),
  }

  // Create Instance of Image model with the image path to safe as document in the MongoDB Image collection
  const image = new Image({
    path: request.file.path,
  })

  // Save new Image document to database
  await image
    .save()
    .then((result) => {
      responseObj.imageId = result._id
    })
    .catch((error) =>
      response.status(500).send({
        message: `Error saving image to database! ${error.message}`,
      }),
    )

  return response.status(200).send(responseObj)
})

export default router
```

After successfully saving the new Image entry (document) to the database, MongoDB responds with the Image document ID, which will immediately be saved to the User document(of the currently logged in user of course) so it will be always be certain where the image is. Securely saved on the backend server with the file location saved to the database with it's Image ID saved in the corresponding User document.

#### Express.static() as CDN

The image is served by ExpressJS which means this backend is also the CDN. Because of this intentional set up,the client server will always be clean of accumulating images and any other kind of files and trash and will the heavy duty of handling large file with a lot of data rest on the backend where a performance impact would have a lot less impact on the U(ser)X(perience).

Express.js can serve static files using **Express.static("public_directory")**.

> **Source:** [/backend/index.js](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/backend/index.js)

```javascript
// Use .static() and configure the /public folder for hosting static resources as CDN for images and other files.
app.use(express.static("public"))
```

> **Note:** All URL's to the files in the public directory have a similar URL structure. An image within the public static files directory with path **public_static_files_dir/uploads/images/137917151-1699497672476.jpg** can be accessed on URL _backend-server-domain.com/uploads/images/137917151-1699497672476.jpg_.

### User profile page and data structure

_Profile page:_
![Profile Page With Profile Picture](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/005.png?raw=true)

At this point there are only a few details a user can set when registering a new account. Of course this will be expend (largely) in the future. For now in this stage of the development process of the application, it's useful to keep minimalistic, clean and keep everything simple now there is not any dependency on yet and over complicate everything. Dependencies for users details could be a detailed profile pages, location/address information, media, posts on a timeline (or feed) or many other things users would want to save personally to their account eventually.

#### `User` schema:

**Schema fields:**

- **username**

  - _Type_: String
  - _Required_: true
  - _Unique_: true
  - _Default_: ''

- **email**

  - _Type_: String
  - _Required_: true
  - _Unique_: true
  - _Default_: ''

- **hashedPassword**

  - _Type_: String
  - _Required_: true
  - _Default_: ''

- **firstName**

  - _Type_: String
  - _Required_: true
  - _Default_: ''

- **lastName**

  - _Type_: String
  - _Required_: true
  - _Default_: ''

- **gender**

  - _Type_: String
  - _Required_: true
  - _Description_: Represents the gender of the user. Can be "Man," "Woman," or "Other."

- **profilePicture**
  - _Type_: mongoose.Schema.Types.ObjectId
  - _Ref_: 'Image'
  - _Description:_ This field is an ID reference to the image document in the database image collection, containing the file path local to the CDN (ExpressJS backend) server from which image file is being served. This allows for the image to be retrieved from the CDN (ExpressJS backend server) and displayed on the client-side application page based on a URL relative to the CDN server that can logically be generated from the image document's file path. This way no hard coded URLs are needed to be saved in MongoDB database and the image documents will be served independent of the backend server domain address making the image documents portable and reusable in different production and development environments and allowing easy migration of the image files to a different storage and host with a different URL/domain.

_Additional fields:_

- **timestamps**
  - Type: Object
  - Description: Automatically adds `createdAt` and `updatedAt` fields to the user doc

**Mongoose:**

- The **Mongoose** schema establishes the data structure for the user information within the database.
- It enforces uniqueness for each user's username and email to prevent double sign-ups and ensuring secure storage of their hashed password.
  User details like `firstName`, `lastName`, `gender`and a reference field to the profile picture image document called `profilePicture`.
- The `User` schema describing the data structure of the MongoDB `User` documents in the `users` collection is defined in the [backend server](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/backend/models/userModel.js).
- The `User` schema is described and defined using Mongoose, a popular _Object Data Modeling (ODM)_ library for MongoDB and Node.js.
- The `User` schema is expected to extends with many fields when continued development will many more dependencies on user data when the application grows and complexity increases.

> **Source:** [/backend/models/userModel.js](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/backend/models/userModel.js):

```javascript
// Instantiate User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },
    hashedPassword: {
      type: String,
      required: true,
      default: "",
    },
    firstName: {
      type: String,
      required: true,
      default: "",
    },
    lastName: {
      type: String,
      required: true,
      default: "",
    },
    gender: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  },
  { timestamps: true }
)
```

**Mongoose `User` model:**

- The User model is created using the mongoose.model function, which takes the name 'User' and the user schema as arguments.
- This model (`User`) serves as an interface to interact with the MongoDB database based on the defined schema.
- The model (`User`) is directly tied to the schema (`userSchema`).
- When you use methods like User.create(), User.find(), or others, Mongoose ensures that the data aligns with the structure defined in the schema.

> _[/backend/models/userModel.js](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/backend/models/userModel.js):_

```javascript
// Instantiate User model
const User = mongoose.model("User", userSchema)
```

### Companies

#### Listing page

On the /companies page the user can see all companies that he owns and has the choice between listing the companies in _card_ view or in _table_ view. The view of choice will be saved as a Redux state so the user preference will be kept as long as they are logged in. I am planning to save this configuration to the database so the user preference will never be lost and can be dispatched to the Redux state every time they log in to their account.

> **Note:** I opened the dropdown menu.

_Card view:_
![Companies Listing Page Card View](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/007.png?raw=true)

_Table view:_
![Companies Listing Page Table View](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/006.png?raw=true)

When the user clicks on the _eye_ icon on a listed company, a modal will pop up that will display the main and most important public company information so the owner of the company can check the company current state quickly at a glance without having to navigate to another company specific details page and lose track of what they were doing or planning to do from the companies listing page.

> **Note:** At this stage in development, companies do not have that many details yet to show. There will be a lot of work to these pages yet and they do not reflect a final version.

![Show Company Details Modal](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/008.png?raw=true)

#### Registration

An owner of a company can register his company in my application. On this companies listing page you see a green `+` icon in the top right corner. When a user clicks on that, he will navigate to the company register page where the user can register a new company that hasn't registered yet by filling in a company registration form.

_Company registration form:_
![Company Registration Form Top](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/008.1.png?raw=true)
![Company Registration Form Bottom](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/008.2.png?raw=true)

#### Form field validation:

All form input fields in my application have to be validated. I've written my own validators for all fields. I've used regular expressions to make sure it is correct data as I expect to receive from the user input.

**Example validator:**

> **Source:** [/frontend/utils/validation/emailValidator.js](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/frontend/src/utils/validation/emailValidator.jsx)

 ```javascript
const emailValidator = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u
  return regex.test(email)
}

export default emailValidator
 ```

**Invalid value notifications:**

![Invalid Values Error Notifications](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/Invalid-Form-Values.png?raw=true)

**Code example communicating invalid values in the UI of company registration page:**

> **Source:** [/frontend/src/pages/companies/RegisterCompany.jsx](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/frontend/src/pages/companies/RegisterCompany.jsx)

 ```javascript
 import React, { useEffect, useState } from 'react'
 import axios from 'axios'
 import { useSnackbar } from 'notistack'
 import emailValidator from '../../utils/validation/emailValidator'
// ... (and a lot of other imports and validator imports here)

const RegisterCompany = () => {
  const [name, setName] = useState(''),
  // email form field input value
    [email, setEmail] = useState(''),
    // ... (states for all other form field values)
    // If value is invalid, emailError would become true
    [nameError, setNameError] = useState(false),
    [emailError, setEmailError] = useState(false),
    // ... (errors states for all form fields here)
    // useSnackbar is a hook that allows us to show a notification that pops up in the left bottom corder (see image above)
    { enqueueSnackbar } = useSnackbar()

  // Functions that will call the name and email validators and sets the error state dependent on the return value from the validators. This function is called directly by the onBlur event listener on the name and email input fields, so it is called when the input field loses focus.
  const validateCompanyName = () => {
      if (companyNameValidator(name)) {
        setNameError(false)
      } else {
        setNameError(true)
      }
    },
    validateEmail = () => {
      if (emailValidator(email)) {
        setEmailError(false)
      } else {
        setEmailError(true)
      }
    },
    // ... (a lot of other validateFormField() functions here)

  // Handle onChange events for all input fields
  const handleNameChange = (event) => {
      setName(event.target.value)
      if (nameError) {
        validateCompanyName()
      }
    },
    handleEmailChange = (event) => {
      
      setEmail(event.target.value)
      
      if (emailError) {
        validateEmail()
      }
    },
  // ... (a lot of input field change handlers here)

  // Handle onChange events for all input fields
  const handleNameChange = (event) => {
      // Set the name state to the current name input field value
      setName(event.target.value)
      if (nameError) {
        // Only IF the name error state is ALREADY true, then validate name always onChange. This prevents a notification when the user hasn't completed his input and would otherwise already show after typing the first character in to the field. onBlur() calls the validateName function initially after losing focus the first time.
        validateCompanyName()
      }
    },
    handleEmailChange = (event) => {
      // Set the email state to the current email input field value
      setEmail(event.target.value)
      if (emailError) {
        // Only IF the email error state is ALREADY true, then validate email always onChange. Initially called by onBlur like the name field.
        validateEmail()
      }
    },
    // ... (here all other onChange handler for the other input fields)

  // Display error messages if the user enters invalid input with useSnackbar
  useEffect(() => {
    if (nameError) {
      // Trigger snackbar notification
      enqueueSnackbar('Company name is invalid!', {
        variant: 'error', // Display notification in a red box
        preventDuplicate: true, // Prevents notification spamming
      })
    }
    // Trigger snackbar notification
    if (emailError) {
      enqueueSnackbar('Email is invalid!', {
        variant: 'error', // Display notification in a red box
        preventDuplicate: true, // Prevents notification spamming
      })
    }
    // ... (rest of the input field if statement whether to display a invalid value error notification)
  }, [
    // This dependency array is set to the error states of the input fields. Every time a state value from this array changes, this useEffect hook function will trigger.
    nameError,
    emailError,
    phoneError,
    kvkNumberError,
    sloganError,
    descriptionError,
    startYearError,
  ])

  // Function that is being called when the user presses the Save button.
  const handleSaveCompany = async () => {
    // Validate all fields before sending the request to the backend, otherwise return
    validateCompanyName()
    validateEmail()
    // ... (validate other fields here)

    // If there are any invalid form fields left, notify the active user and return without saving and without redirect.
    if (
      nameError ||
      emailError ||
      phoneError ||
      kvkNumberError ||
      sloganError ||
      startYearError ||
      !name ||
      !email ||
      !phone ||
      !kvkNumber ||
      !slogan ||
      !startYear
    ) {
      enqueueSnackbar(
        'Please fill in all fields correctly before saving this company!',
        {
          variant: 'error',
          preventDuplicate: true,
        },
      )
      return
    }

    // If all values are correct, prepare object for company save request
    const data = {
      name,
      logo,
      email,
      phone,
      kvkNumber,
      slogan,
      startYear,
      description,
      owners: [{ userId }],
    }
    // Render loading animation for as long as the request takes
    setLoading(true)
    axios
      .post(`${BACKEND_URL}/companies`, data)
      .then(() => {
        // Saving company success
        // Stop loading animation
        setLoading(false)
        // Notify the user about success
        enqueueSnackbar('Company registered successfully!', {
          variant: 'success',
          preventDuplicate: true,
        })
        // Redirect back to companies listing page
        navigate('/companies')
      })
      .catch((error) => {
        // If request failed notify active user accordingly to the problem that occurred.
        // Company with the KvK number already existed, is not unique
        if (error.response.status === 409) {
          enqueueSnackbar('Company with this KVK number already exists!', {
            variant: 'error',
            preventDuplicate: true,
          })
          // Set KvK error to true
          setKvkNumberError(true)
          // Display a more fitting message below the input field.
          setKvkNumberErrorMessage(
            'Company with this KVK number already exists!',
          )
        }
        // Disable animation
        setLoading(false)
        // Always notify user saving company failed
        enqueueSnackbar('Error registering company!', {
          variant: 'error',
          preventDuplicate: true,
        })
      })
  }

  return (
    // ... (Top of the register page)

      <div className='my-4'>
        <label className='text-xl mr-4' htmlFor='company-name-input'>
          Name
        </label>
        <input
          className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
            nameError ? 'border-red-500' : ''
          }`}
          data-test-id='company-name-input'
          id='company-name-input'
          onBlur={validateCompanyName} // onBlur event validate name field function call
          onChange={handleNameChange} // onChange event name field change handler function call
          type='text'
          value={name}
        />
        { /* Conditionally render the error notification text below the input field: */}
        {nameError ? (
          <p className='text-red-500 text-sm'>
            Company name must be between 1 and 60 characters long and can
            only contain letters, numbers, spaces, and the following
            characters: &#45;, &apos;, and &#46;
          </p>
        ) : (
          ''
        )}
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4' htmlFor='company-email-input'>
          Email
        </label>
        <input
          className={`border-2 border-purple-900 bg-cyan-100 focus:bg-white rounded-xl text-gray-800 px-4 py-2 w-full ${
            emailError ? 'border-red-500' : ''
          }`}
          data-test-id='company-email-input'
          id='company-email-input'
          onBlur={validateEmail} // onBlur event validate email field function call
          onChange={handleEmailChange} // onChange event email field change handler function call
          type='text'
          value={email}
        />
        { /* Conditionally render the error notification text below the input field: */}
        {emailError ? (
          <p className='text-red-500 text-sm'>
            Email must be a valid email address.
          </p>
        ) : (
          ''
        )}
      </div>
  )
 ```

##### KVK number validation:

![Invalid KvK Number](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/Invalid-KvK-Number.png?raw=true)

Companies in the Netherlands (my home country) are always registered to the "Kamer van Koophandel" which is the Chamber of Commerce in the Netherlands. It is a government agency that plays a crucial role in the registration and documentation of businesses operating in my country.

I've connected the backend application to the KvK test API for validation of company KvK numbers. When a user registers a company to my application and fills in the KvK number, when the input field loses focus (`onBlur()`), automatically there will be a request to the KvK (test) API for KvK number validation.

**GET route to get KvK data:**

> **Source:** [/backend/routes/kvkRoute.js](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/backend/routes/kvkRoute.js)

```javascript
import { getKvkData } from '../controllers/kvkController.js'
import express from 'express'
import cors from 'cors'

const router = express.Router()

// GET route to get KvK data from the KvK API by KvK number
router.get('/', cors(), getKvkData)

export default router
```

**KvK controller for handling request:**

> **Source:** [/backend/controllers/kvkController.js](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/backend/controllers/kvkController.js)

```javascript
import axios from 'axios'
import fs from 'fs'
import https from 'https'
import { KVK_TEST_API_KEY } from '../config.js'

const PATH_TO_KVK_API_CERTIFICATE_CHAIN_RELATIVE_TO_INDEX_APP =
  './certs/kvkApi/Private_G1_chain.pem'

// Function to get data from the KVK API
export const getKvkData = async (request, response) => {
  try {
    // Get the query from the request query parameters
    const { kvkNumber } = request.query,
      // Get the certificate chain from the file system
      certificateChain = fs.readFileSync(
        PATH_TO_KVK_API_CERTIFICATE_CHAIN_RELATIVE_TO_INDEX_APP,
        'utf8',
      ),
      // Create an https agent with the certificate chain
      // https://nodejs.org/api/https.html#https_https_request_options_callback
      agent = new https.Agent({
        ca: certificateChain,
      }),
      // Get the data from the KVK API GET request
      { data } = await axios.get(
        `https://api.kvk.nl/test/api/v1/naamgevingen/kvknummer/${kvkNumber}`,
        {
          headers: {
            apikey: KVK_TEST_API_KEY,
          },
          httpsAgent: agent,
        },
      )

    // Send status 200 response and the data to the client
    return response.status(200).json(data)
  } catch (error) {
    console.log('Error in GET /kvk: ', error)
    // If the error is a 400 error, send a 400 response with the error message
    if (error.response.status === 400) {
      return response.status(400).send({ message: error.message })
    }
    // Else, send a 500 response with the error message
    return response.status(500).send({ message: error.message })
  }
}
```

For now, only number validation is enough, but in the future also the company name, owners and other company details will be verified against this API to rule out the need for human verification as much as possible to safe costs and make the user experience a much faster because users can get started with their company in the application right away without having to wait for a manual verification of their business.

**Subsidiary companies:**:
KvK numbers have to be unique so companies can't get registered more then once, in the future this uniqueness has to be combination between Kvk number and company name (and also maybe other company details) because companies can have subsidiary companies with the same number and these subsidiary companies should be able to be registered as valid companies to the application because for a regular user using the app to find a company they need, it is not important to know that a company has a parent company. If companies find it necessary to inform the regular user (and potential customer) about their subsidiarity of a parent company, then they should be able to inform users about that on their company profile page (in very early development).

#### `Company` document data structure

When I first got the business idea for building this application I decided to make companies the main central starting point to focus on, find out what is necessary to get companies on board with my application and want to register and pay for premium features. Almost the first thing I started building was a company model that has all required fields where companies would be dependent on realizing the ideas I have in mind for my application, resulting in a `Company` model with many fields. At this stage of development only a few of there defined fields are actually used and populated with data at the moment, but because it is not a requirement to populate every field with data before saving and editing `Company` documents in the database, I feel no need to simplify the model for the time being at all.

#### `Company` schema:

**Schema fields:**

1. **Name:**

   - Type: String
   - Required: true
   - Description: The name of the company.

2. **Logo:**

   - Type: String (Base64 format)
   - Required: false
   - Default: ""
   - Description: The company's logo (still) in Base64 format.

3. **Email:**

   - Type: String
   - Required: true
   - Default: ""
   - Description: The company's email address for correspondence.

4. **Phone:**

   - Type: String
   - Required: true
   - Default: ""
   - Description: The company's contact phone number.

5. **KVK Number:**

   - Type: String
   - Required: true
   - Unique: true
   - Default: ""
   - Description: Kamer van Koophandel (KVK) number of the company.

6. **KVK Validated:**

   - Type: Boolean
   - Required: true
   - Default: false
   - Description: Indicates whether the KVK number is validated using the already fully functional and authenticated KVK test API end point connection.

7. **Slogan:**

   - Type: String
   - Required: true
   - Default: ""
   - Description: The company's slogan.

8. **Description:**

   - Type: String
   - Required: true
   - Default: ""
   - Description: A short description of the company.

9. **Address:**

   - Type: Object
   - Required: false
   - Default: {}
   - Description: The registered address of the company.

10. **Billing Address:**

    - Type: Object
    - Required: false
    - Default: {}
    - Description: The address to send invoices to.

11. **Address Format:**

    - Type: ObjectId (Reference to Address Format model)
    - Required: false
    - Default: null
    - Description: The country specific address format of the country the registered company is in.

12. **Country:**

    - Type: String
    - Required: false
    - Default: "NL"
    - Description: The country of the company's billing address.

13. **Region:**

    - Type: String
    - Required: false
    - Default: ""
    - Description: The region of the company's billing address.

14. **Owners:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: An array of objects containing owner their `User` `ObjectId`'s corresponding with their documents' ID in the of the `users` collection. Owners will always have the right to admin level access to company configuration and can disable admin level access to these configurations any time for safety, they can also enable these admin rights whenever is necessary and will be prompted regularly to disable the elevated admin access to prevent any unintended possible disasters (like deleting the company by accident and losing all reviews, score and status).

15. **Company Admins:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: An array of `ObjectId`'s containing company admins `User` ID's who have elevated access to Company configuration. Admins have elevated access to company configurations and can disable admin level accessibility to these configurations any time for safety, they can also enable these admin rights whenever is necessary and will be prompted regularly to disable the elevated admin access to prevent any unintended possible disasters just like owners. Admins have the right to add other admins to a company when they have elevated access enabled, but initially a company owner with elevated access had to add the first admin (who is not company owner).

16. **Locations:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: An array of objects representing company locations. This will be `ObjectId`s corresponding to `Address` documents in the `address` collection.

17. **Departments:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: An array of objects representing company departments. To be decided the format this will be in.

18. **Business Config:**

    - Type: Object
    - Required: false
    - Default: {}
    - Description: Configurable settings for company owners and admins with elevated access enabled.

19. **Payment Details:**

    - Type: Object
    - Required: false
    - Default: {}
    - Description: Payment details for the company. Think about anything solely necessary for financial transactions in any direction.

20. **Start Year:**

    - Type: Number
    - Required: false
    - Default: 0
    - Description: The year the company was started.

21. **Active:**

    - Type: Boolean
    - Required: false
    - Default: true
    - Description: Indicates if the company is currently active. (Open for business)

22. **Industries:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: An array of industries associated with the company for grouping companies and search result improvement.

23. **Public:**

    - Type: Boolean
    - Required: false
    - Default: true
    - Description: Indicates if the company is public or private.

24. **Reviews:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: An array of `ObjectId`s of `Review` documents in the `review` collection in the database representing this companies' reviews.

25. **Rating:**

    - Type: Number
    - Required: false
    - Min: 0
    - Max: 5
    - Default: 0
    - Description: The overall rating of the company. Every `User` can vote on this only a single time but might be able to edit their rating of the company. In what format ratings should be tracked and saved is to be decided.

26. **Customers:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: An array of customers `User` `ObjectId`s in from the `users` collection in database.

27. **Premium:**

    - Type: ObjectId (Reference to Premium Type model)
    - Required: false
    - Default: null
    - Description: The premium type associated with the company. Like "none" "bronze", "silver", "gold" or "platinum". What every premium subscription level has to cost and what advantages or features these provide for subscribed companies is to be decided, think about company profile cosmetic changes or being able to have actions, discounts or events, BUT companies will never be able to pay for a higher place in the search result because that defeats the purpose of this application completely.

28. **Vendor:**

    - Type: ObjectId (Reference to Vendor model)
    - Required: false
    - Default: null
    - Description: Can this company sell to other companies? If so, this company will be marked as vendor and probably have a corresponding `Vendor` document in the (yet un-existing) `vendors` collection where all to vendors specific data will be saved.

29. **Employees:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: An array of `User` `ObjectId`'s of users who accepted the `Invite` to become employee of this company and will be able to have some functionalities within this company like writing `Story` posts under their own name and communicate with (potential) customers (users of this application).

30. **Stories:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: `ObjectId`'s of `Story` documents in the `stories` collection. Stories are posts placed on a timeline where you can see what the company has been active in lately and in the past. Stories can differ a lot from one another, companies have to be able to have a large spectrum of possibilities adding stories that fit their wishes.

31. **Products:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: Products a company can offer and users can buy. Probably will be an array of `ObjectId`'s, but have to decide how to structure product data. Maybe product selling functionality would require a compete new platform to be with a realtime connection synchronizing with this application.

32. **Services:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: A company can offer and sell services to users. The exact format this will be build in is to be decided.

33. **Agenda:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: An array of agenda objects associated with the company. Format is to be decided.

34. **Appointments:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: An array of appointments with users and other companies, format is to be decided.

35. **Messages:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: Corresponds with messages in the `messages` collection `ObjectId`'s of `Message` documents. Still need to decide on the messages' format and data structure.

36. **Notifications:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: An array of corresponding `Notification` documents'

37. **Events:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: `ObjectId`'s corresponding to `Event` documents in the `events` collection. Events could be anything that is organized and it is still to decide in which many ways and configurations events could be created by users of the application.

38. **Tasks:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: Array of `ObjectId`'s of `Task` documents in the `tasks` collection. Could be anything a user or company could have to do and I will decide later on all the functionalities and data structure of tasks later on.

39. **Invoices:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: Array of `Invoice` document `ObjectId`'s in the `invoices` collection. `Invoice` data structure has to be decided on yet.

40. **Orders:**

    - Type: Array
    - Required: false
    - Default: []
    - Description: Array of `Order` document `ObjectId`'s in the `orders` collection which will contain all kind of orders users and companies could make and contains information of all order specific data like order status and much more.

41. **Payments:**

    - Type: Array
    - Required: false
    - Unique: true
    - Default: []
    - Description: Array of `Payment` document `ObjectId`'s in the `payments` collection which keeps track of all financial transactions between everybody.

42. **Main Image ID:**

    - Type: String
    - Required: false
    - Default: ""
    - Description: The main image should be the first thing people see when searching for a company and should be the _eye catcher_ of the company to attract people to look into them. This is meant to be a different image then the company logo, the logo is also displayed in the first glance of a user searching for a company but smaller in a corner (something like that).

43. **Images:**

    - Type: Array
    - Required: false
    - Description: An array of image objects associated with the company.

44. **Timestamps:**
    - Type: Object
    - Description: Automatically adds `createdAt` and `updatedAt` fields to the user doc

**Mongoose:**

- The **Mongoose** schema establishes the data structure for the company information within the database.
- It enforces uniqueness for each companies' KVK number to prevent double registrations.
- The `Company` model has a lot of fields not being populated with data yet, but the size of this model tells very clearly about what size of the application would become.

**Schema:**

```javascript
// Instantiate `Company` schema
const companySchema = new mongoose.Schema(
  {
    // ... (all schema fields are defined here)
  },
  { timestamps: true }
)
```

> **Note:** To see the complete code of the `Company` schema instantiation with all fields [here](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/backend/models/companyModel.js).

**Model:**

```javascript
// Instantiate `Company` model
const Company = mongoose.model("Company", companySchema)
```

#### Edit company

When a company owner clicks on the _pencil_ icon on the companies listing page the owner is able to edit the company.

![Edit Company Page](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/Edit-Company.png?raw=true)
![Edit Company Page](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/Edit-Company-2.png?raw=true)

#### Company ownership

Companies are automatically owned by the `User` that registers the company to the application.

If a company has more than one owner, the company owners is able to invite other users for company ownership, giving the other co-owners the same admin level elevated access to the configuration of their company.

_Find other users and invite them for co-ownership:_
![Find Other Users For Company Co-ownership](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/Find-Other-Users-For-Company-Co-ownership.png?raw=true)

A company owner can find users of the application with the search box on the "edit company" page and send them a invite by clicking the `invite` button.

When a user is invited by the owner for co-ownership the user "result" will be removed from the search results list and a "Pending invites" section will appear with the invited user. I invited the user Kaya Lowe in this example.

![User Invited On Edit Company Page](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/User-Invited.png?raw=true)

> **Note:** In the future this `Invite` information will be the user details, but I have to make a future decision about where I want this data to be served from the backend to the client application, that's why it is only containing `ObjectId` information of the `Invite` document. See the `Invite` schema data structure [further down below](#invite-schema).

When the `User` is invited to become co-owner of the company, that user will receive a invite notification in the navigation bar.

![User Invited On Edit Company Page](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/Invite-Notification.png?raw=true)

Clicking on the `Invites` dropdown menu item, the user will navigate to the invites page and be able to _Accept_ or _Decline_ the invite by clicking the buttons in the _Operations_ section in the _Invites_ table listing the pending invites.

![Invites Page](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/Invites-Page.png?raw=true)

After clicking _Accept_ or _Decline_ and there is no pending invite left, the user will navigate to the companies listing page and the companies they accepted will be listed there with their name added as co-owner.

![Invite Accepted](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/Invite-Accepted.png?raw=true)

> **Note:** The invite notification has disappeared, the _Invites_ dropdown menu item isn't listing anymore.

After accepting the invite, the _Owners_ section of the _edit company_ page is updated with the new owner and the _Pending invites_ Section disappeared since there are no pending invites left.

![Owners Section Updated](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/Ownership-Section-Updated.png?raw=true)

> **Note:** In React I use _conditional rendering_ and _state management_ to easily always keep the UI up-to-date with the current state of the application when the state (current data) has been changed.

#### `Invite` schema:

**Schema fields:**

1. **Sender ID:**

   - Type: mongoose.Schema.Types.ObjectId
   - Reference: "User"
   - Description: The ID of the user sending the invitation.

2. **Receiver ID:**

   - Type: mongoose.Schema.Types.ObjectId
   - Reference: "User"
   - Description: The ID of the user receiving the invitation.

3. **Kind:**

   - Type: String
   - Description: Specifies the type of invitation, with possible values: "company_ownership", "friend", "other". Default value is "other".

4. **Company ID:**

   - Type: mongoose.Schema.Types.ObjectId
   - Reference: "Company"
   - Description: If the invitation is related to company ownership, this field contains the ID of the associated company.

5. **Kind:**

   - Type: String
   - Default: "pending"
   - Description: Represents the status of the invitation. Only four possible values: "pending", "accepted", "declined", and "canceled".

6. **Timestamps:**
   - Type: Automatically generated timestamps for document creation and modification.

**Mongoose:**

- The **Mongoose** schema establishes the data structure for the invite information within the database.

**Schema:**

```javascript
// Instantiate `Invite` schema
const inviteSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    kind: {
      type: String,
      required: true,
      default: "other",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  { timestamps: true }
)
```

**Model:**

```javascript
// Create `Invite` model from `inviteSchema`
const Invite = mongoose.model("Invite", inviteSchema)
```

This was the visual demo for now, I will update this later on, so come back in a while to check it out!

## Get up and running:

To run this application locally, follow these steps:

0. **Create a free MongoDB database to connect with and obtain a MongoDB authentication URL.**

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:ThomPoppins/MERN_STACK_PROJ..git MERN_STACK_PROJ && cd MERN_STACK_PROJ
   ```

2. **Set Up Backend Configuration**:

   - Navigate to the `/backend` folder in your file explorer.
   - Create a `config.js` file.
   - Add the following constants and update them to your personal values:

     ```javascript
     // backend/config.js
     // port for the server to listen on
     export const PORT = 5555;

     // YOUR MongoDB database connection URL (if you want to test this application without creating your own database, contact me at thompoppins@gmail.com, I'll provide you with a database URL)
     export const mongoDBURL =
       "mongodb+srv://exampleuser:examplepasswork@example-mern-stack-project.xhvmidl.mongodb.net/?retryWrites=true&w=majority";

     // Secret key for JWT signing and encryption (just generate a random string or keep it like it is for testing purposes)
     export const JWT_SECRET = "yoursecretkey";

     // TEST API key for KVK API (also required)
     export const KVK_TEST_API_KEY = "l7xx1f2691f2520d487b902f4e0b57a0b197";

     // PROD API key for KVK API (also required)
     export const KVK_PROD_API_KEY = "";
     ```

3. **Set Up Frontend Configuration**:

   - Navigate to the `/frontend` folder.
   - Create a `config.js` file if it doesn't exist.
   - Add the following constant and export it:

     ```javascript
     // frontend/config.js
     export const BACKEND_URL = "http://localhost:5555";
     // Disable company validation by KVK API (If you want to test the KVK company validation, mail me at thompoppins@gmail.com for instructions how to set this up.)
     export const TEST_KVK_API = false;
     ```

4. **Install Dependencies**:

   - Inside the `/backend` folder, run:

     ```bash
     npm install
     ```

   - Inside the `/frontend` folder, run:

     ```bash
     npm install
     ```

5. **Start the Servers**:

   - Inside the `/backend` folder, run:

     ```bash
     npm run dev
     ```

   - In a separate terminal, inside the `/frontend` folder, run:

     ```bash
     npm run dev
     ```

6. **Access the Application**:
   - Visit the web application in your browser using the link printed by the Vite.js server after starting the frontend server.

Now you have the application up and running locally!

## Versions

### v0.0.3

#### Find other users for co-ownership with search field

When you are an owner of a company it is possible to search for any other users of the application and the search terms are matched against other registered users' email, username, first name and last name values. The search result is updated every change within the search input field (onChange).

A list with up to 10 most relevant users that match the criteria will automatically render right below the search field input sorted by most relevant result on top to 10th relevant user last.

#### Send invites to invite other users to get company co-owner

Users who own companies can send invites to other users to become co-owner.

![Invite User To Become Co-owner](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/009.png?raw=true)

The invited user will be notified when he is logged in. In the navigation bar will a animated icon wiggle and a menu item called `Invites` will appear. Clicking this menu item will navigate the user to a page where all pending invited are listed.

![Invite Notification](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/013.png?raw=true)

On the pending invites listing page, hte invite receiving user can either _Accept_ or _Decline_ the invitation. When they accept they are now co-owner of the company.

![Invites Listing Page](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/014.png?raw=true)

If the receiving user has answered to all invited and none are left, the user will be navigated to the /companies listing so they see the result of their actions directly because the companies they just got owner from are listed here. The notification in the navigation bar has disappeared and the `Invites` menu item as well.

![Invites Listing Page](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/Invite-Accepted.png?raw=true)

### v0.0.2

### Backend server CDN for static files

The backend server is now a CDN for static files like images. This means that the backend server will serve the static files from the `/backend/public` folder. This way, the frontend application can access the images from the backend server without having to store the images in the frontend application. This also makes it possible to use the backend server as a CDN for other applications that need to access the images.

### File upload

Users can now upload a profile picture. The profile picture will be saved in the `/backend/public/uploads/images` folder and the path to the image will be saved in the database. The backend server will serve the image from the `/backend/public` folder. This way, the frontend application can access the image from the backend server and the image path is stored in the database.

![Upload Profile Picture Modal Image Unselected](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/003.png?raw=true)

![Upload Profile Picture Modal Image Selected](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/004.png?raw=true)

![Profile Picture Uploaded](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/005.png?raw=true)

### v0.0.1

### Registering an Account

Users can easily create an account by visiting the homepage of my application. The registration process is straightforward and requires users to provide basic information such as their email address, a secure password, and any additional required details. Once registered, users gain access to the full suite of functionalities offered by the application.

### Logging In

Registered users can log in to their accounts using their previously provided credentials. This allows them to access and utilize all features and services provided by the application. The login process is secure and ensures that only authorized users can access their accounts.

When you log in a JWT token is generated and stored in the browser's local storage. This token is used to authenticate the user and to make sure that the user is authorized to access the application. The token is also used to make sure that the user is authorized to access certain resources in the application. For example, the user can only access his own company resources and not the company resources of other users.

## Company Registration and Ownership

Upon logging in to their account, users have the capability to register a company that they own. This action automatically designates the user as the owner of the registered company, granting them administrative privileges within the application.

- **Ownership Privileges:** The user, upon registering a company, assumes the role of owner with full administrative control over the company's operations.

### How to Register a Company

1. Log in to your account.
2. Navigate to Companies
3. Click the plus icon to add a new company.
4. Fill in company details with KVK-number and submit the registration form.

Upon successful registration and validation from the KVK API, the user will be recognized as the owner of the company and will have access to all administrative functionalities associated with it.

### How to add a co-owner to a company

1. Log in to your account.
2. Navigate to Companies
3. Click the pencil icon to edit a company.
4. Search for a user by name, username or email.
5. Click the add button to add the user as a owner to the company.

## Project Issue Progression

> **NOTE:** The tags starting with [MERNSTACK-] are corresponding Jira issue identifiers.

- [x] [MERNSTACK-103] Start using testing frameworks Mocha and Chai to write automated tests for the endpoints and ensure that the code is working correctly.
- [x] [MERNSTACK-74] Set up `Company` model.
- [x] [MERNSTACK-65] Create a route to save a new Company document in the database.
- [x] [MERNSTACK-95] Test companyRouter POST route `/` for saving a new company with Postman.
- [x] [MERNSTACK-66] Create a route to get all Company documents from the database.
- [x] [MERNSTACK-96] Test companyRouter GET route `/` for getting all companies with Postman.
- [x] [MERNSTACK-67] Create a route to get a single Company document from the database.
- [x] [MERNSTACK-97] Test companyRouter GET route `/:id` for getting a single company with Postman.
- [x] [MERNSTACK-68] Create a route to update a single Company document in the database.
- [x] [MERNSTACK-98] Test companyRouter PUT route `/:id` for updating a single company with Postman.
- [x] [MERNSTACK-69] Create a route to delete a single Company document from the database.
- [x] [MERNSTACK-99] Test companyRouter DELETE route `/:id` for deleting a single company with Postman.
- [x] [MERNSTACK-70] Set up GET, POST, PUT and DELETE Book server routes.
- [x] [MERNSTACK-51] Create Jira tickets for all TODOs.
- [x] [MERNSTACK-53] Create GET, POST, PUT and DELETE Company server routes.
- [x] [MERNSTACK-55] Create User model.
- [ ] [MERNSTACK-57] Create Owner model. Owner schema should set up a one-to-one relationship with the User schema by using a `userId` field in the Owner schema that references the `_id` field of the User schema. This will allow to associate each Owner document with a single User document.
- [x] [MERNSTACK-59] Create one-to-many relationship between Owner and Company in the Owner schema. This will allow to associate each Owner document with multiple Company documents. UPDATE: This is not needed because the Company schema will have an `owners` field that will be an array of owner objects with `userId` field.
- [x] [MERNSTACK-56] Create login and register functionality. Hash user password on register and compare hashed password on login. (see backend devdocs folder)
- [x] [MERNSTACK-60] Create `user` authentication and authorization functionality using JSON Web Token authorization. (see backend devdocs folder)
- [x] [MERNSTACK-58] When user is logged in, create a form to register a company and make user owner. Owner has admin rights at first when creating his account and registering his company.
- [x] [MERNSTACK-61] Create `junction` table for many-to-many relationship between `owners` and `companies`. (see backend devdocs folder) CANCELLED: For now it is easier to just add an `owner` field to the `Company` schema and model. This will allow to associate each Company document with company owners. No need for a `junction` table that will make it more complex without any use for it.
- [ ] [MERNSTACK-62] Create `junction` table between `Company` and `Project`. This table will be used because of the many-to-many relationship and additional properties that are needed to link a company to a project. (see backend devdocs folder)
- [ ] [MERNSTACK-63] Create `junction` table between `User` and `Company`. (also a many-to-many relationship, user would be customer of companies and companies would have move then one customers) CONSIDER: Saving users as customers to `company` model instead of creating a `junction` table. This will allow to associate each Company document with multiple User documents. No need for a `junction` table that will make it more complex without any use for it.
- [x] [MERNSTACK-144] After user login, display link that will `navigate` (?with `useNavigate()`?) user to `my-companies` where companies will be listed and with a company register form. (see frontend devdocs folder)
- [x] [MERNSTACK-64] In the frontend, create a route to `/my-companies` where `user` companies will be listed. UPDATE: Route will be /companies for now.
- [x] Move redux documentation on redux from backend devdocs folder to frontend devdocs folder.
- [ ] [MERNSTACK-145] Break down all ideas in the `Features:` section below into smaller tasks and create Jira tickets for them.
- [x] [MERNSTACK-102] Check for the word `property` when it should be `field` in the documentation of schemas and models. Check for the word `field` when it should be `property` in the documentation when talking about database `document`'s
- [x] [MERNSTACK-114] Use time-travel debugging with Redux DevTools.
- [x] [MERNSTACK-115] Decide the default destination after clicking the BackButton, something like the previous page or the home page.
- [x] [MERNSTACK-116] Create table on the frontend to display all companies.
- [x] [MERNSTACK-117] Create ShowCompany component to display a single company's details
- [x] [MERNSTACK-118] Create EditCompany component to edit a single company's details.
- [x] [MERNSTACK-119] Create DeleteCompany component to delete a single company.
- [x] [MERNSTACK-120] Create CreateCompany component to create a new company.
- [x] [MERNSTACK-121] Implement a button on the ShowCompany component that allows the user to navigate to the corresponding EditCompany page.
- [x] [MERNSTACK-123] Create a CompanyModal component that will show up on the CompaniesList page when the user clicks on the `eye` icon.
- [x] [MERNSTACK-122] Create CompaniesList page (where all companies for a user will be shown in `table` or `card` view.) and safe this `table`/`card` setting to Redux store state so user will return to listing page with preferred setting.
- [x] [MERNSTACK-124] Use useSnackbar() for displaying error or success messages to the user in the Company components.
- [x] [MERNSTACK-125] Inform myself better about using useEffect() to prevent infinite loop situations when my application get more complex. [Speech about using useEffect effectively](https://www.youtube.com/watch?v=eFGeStq8dZo&list=PLokIxGKSireSB4Gx6r7xWlFs9Q9PueDED&ab_channel=ReactConferencesbyGitNation)
- [x] [MERNSTACK-126] Use react-redux in frontend to `dispatch` actions to `reducers` and `store` to `get` and `set` `state` and `props` in the frontend and combine at least 2 `reducers`. (see frontend devdocs folder)
- [x] [MERNSTACK-138] Create user register page and functionality, save with bcrypt hashed password in database.
- [x] [MERNSTACK-139] Create a user login page and functionality, validate user password has with bcrypt and compare hashed password on login.
- [x] [MERNSTACK-140] Make it possible for a user to register a company and automatically become first company owner.
- [x] [MERNSTACK-141] Find fitting icons for company `name` `phone number` and `email` for the ListCompanies `card` view and CompaniesModal component. Find them in the react-icons library. DO THIS BEFORE CREATING ANY OTHER LIST COMPONENTS!
- [ ] [MERNSTACK-142] Update README.md with explanation about the validators I created in the frontend application. Explain the regex of every validator used to validate and the test method that returns true or false.
- [x] [MERNSTACK-143] Add explanation about the main advantages of using MongoDB and Mongoose in the README.md file in the Backend section.
- [x] [MERNSTACK-14] Create a new schema and model for user.
- [x] [MERNSTACK-162] Save userId as state in Redux store after verification of JWT token, make only /, /login and /register routes accessible for users that are not logged in.
- [x] [MERNSTACK-161] Fix CORS policy error when registering user
- [x] [MERNSTACK-155] Populate the user document with the properties from the request body if they exist when registering account.
- [x] [MERNSTACK-169] On all forms, validate user input when losing focus and display error message if input is not valid and the right format and color the input field border red.
- [x] [MERNSTACK-173] Finish EditCompany component, integrated with search functionality so users can be found by name, username or email and added to company as owner.
- [x] [MERNSTACK-175] Solve the problem of the owner being undefined
- [x] [MERNSTACK-181] Add remove button to remove owner from company in EditCompany component.
- [x] [MERNSTACK-176] Display owners first name and last name on `<ShowCompany />` `<CompanySingleCard />` and `<CompanyModal />`.
- [x] [MERNSTACK-177] Only find owners that are not already owners of the company in the EditCompany and UserSearch component.
- [x] [MERNSTACK-178] Send invitation to user to become owner of company.
- [x] [MERNSTACK-179] Display a "Invitation pending" or "Invited" message in de EditCompany page when user hasn't accepted the invitation to become owner of the company yet.
- [x] [MERNSTACK-180] Move save new company owner functionality to acceptBecomeCompanyOwnerInvitation() function in some new component.
- [x] [MERNSTACK-182] Save new owners of company after pressing save button in EditCompany component. CANCELLED: Now the owner can add owners in a different `form` in the EditCompany component without a save button so it is clear that a owner has been added without submitting the form.
- [x] [MERNSTACK-183] Remove "Remove" button from EditCompany component of the current logged in user.
- [x] [MERNSTACK-174] When the user selects a user to add as an owner to the company, update the owners state variable in the `<EditCompany />` component to include the selected user. You can use the setOwners() function to update the owners state variable.
- [x] [MERNSTACK-171] Display results in a list displaying the username, name and email
- [x] [MERNSTACK-170] Make API call to backend to find users by query on username, name or email, use useEffect to call this function when query changes
- [x] [MERNSTACK-168] Make possible for user (owner) to add other owners to the company by finding other users and adding them to the company
- [x] [MERNSTACK-17] "owners" array should contain owner objects with an userId.
- [x] [MERNSTACK-16] Owners will be linked to a company, based on an ownerId in the owner model. CANCELLED: Now the owner will be linked to a company, based on an userId corresponding to the user `_id` in the user model.
- [x] [MERNSTACK-184] Remove item from search results when added
- [x] [MERNSTACK-160] Display error message under the input field if the input is invalid explaining the right format on all forms
- [x] [MERNSTACK-159] Give input field of the form a red border if the input is invalid on all forms
- [x] [MERNSTACK-153] Check if the user already exists in the database in usersRoute.jsx when registering a new user. Hint: Use the findOne method and consider using `unique: true` in the user schema.
- [x] [MERNSTACK-154] If the user already exists, send status 409 response and a (error) message to inform the client.
- [x] [MERNSTACK-186] Check MongoDB discord server and Twitter for the BUG that users aren't filtered using the $nin operator
- [x] [MERNSTACK-188] Remove `No` field and add KVK number field in CompaniesTable component
- [x] [MERNSTACK-167] Add KVK number to the form in RegisterCompany and EditCompany components.
- [x] [MERNSTACK-191] Export working getKvkData function returning the KVK data in kvkController.js
- [x] [MERNSTACK-190] Make call to backend API to validate kvk number in kvkNumberValidator
- [x] [MERNSTACK-189] Add real kvk number validation with API call in kvkNumberValidator
- [x] [MERNSTACK-193] Fix BUG that you can save a company without kvk number validation in RegisterCompany.jsx and EditCompany.jsx SOLUTION: Throw an error in the kvkNumberValidator if the kvk number is not valid. Catch the error in the RegisterCompany and EditCompany components and display an error message to the user. If the KVK number is not valid, return from handleEditCompany() and handleSaveCompany() functions and don't save the company.
- [x] [MERNSTACK-110] Check if the company already exists in the database based on kvkNumber in companiesRoute.jsx. Hint: Use the findOne method and consider using `unique: true` in the company schema.
- [x] [MERNSTACK-111] If the company already exists, send status 409 response and a (error) message to inform the client in companiesRoute.jsx.
- [x] [MERNSTACK-146] Decide if the default values should be set in the model or in the route. Hint: Consider using the `default` property in the company schema. CONCLUSION: Set default values in the model.
- [x] [MERNSTACK-109] Populate the company document with the properties from the request body if they exist in companiesRoute.js.
- [x] [MERNSTACK-203] Make file upload possible as user profile image
- [ ] [MERNSTACK-209] Make file upload possible as company logo
- [x] [MERNSTACK-206] Set up a profile picture upload for the user
- [x] [MERNSTACK-195] Define the invite model
- [x] [MERNSTACK-207] Save the profile picture Base64 string to the database
- [x] [MERNSTACK-208] Create default page layout that all pages will become children of
- [x] [MERNSTACK-210] Change text color to white when background image is set
- [x] [MERNSTACK-211] Add background color with opacity to all places where text is displayed on top of the background image.
- [ ] [MERNSTACK-212] Create account edit page for account settings/configurations.
- [x] [MERNSTACK-213] Complete styling on RegisterCompany page.
- [x] [MERNSTACK-166] Validate validity and uniqueness of company KVK number
- [x] [MERNSTACK-214] Style all form input fields
- [x] [MERNSTACK-216] Use Multer for large image file upload.
- [x] [MERNSTACK-217] Create a new routes file for file uploads. When the profile picture is uploaded, save the link/URL with the filepath in the database. ALSO return the path/fileId of the image as response to the client, so when the user registers the correct fileId/filepath will be saved to the new/edited user/company.
- [x] [MERNSTACK-218] Make /backend server a CDN for static files like images.
- [x] [MERNSTACK-202] FIX backend error: "PayloadTooLargeError: request entity too large" for images too large ExpressJS (<https://www.webslesson.info/2022/05/upload-file-in-node-js-express-using-multer.html>) SOLVED using Multer for large image file uploads.
- [x] [MERNSTACK-165] Create a schema and model for images.
- [x] [MERNSTACK-219] Make first name and last name required on user registration. In the model, route, validator and frontend page form.
- [ ] [MERNSTACK-220] After registration, log user in automatically and redirect to /account/onboarding page.
- [x] [MERNSTACK-158] Display error message under the input field if the input is invalid explaining the right format in LoginUser, RegisterUser, RegisterCompany and EditCompany components.
- [x] [MERNSTACK-157] Give input field of the form a red border if the input is invalid in LoginUser, RegisterUser, RegisterCompany and EditCompany components.
- [x] [MERNSTACK-221] Log in when user has filled in his/her password and pressed enter.
- [x] [MERNSTACK-222] Use a placeholder image for the profile picture, specifically a man for male users and a woman for female users.
- [x] [MERNSTACK-223] Spin animation on Find button on homepage when the button is clicked.
- [x] [MERNSTACK-224] Update "Invite" status when user Accepts or Declines a Invite.
- [x] [MERNSTACK-225] If there is 1 or more pending invites, notify the user in the Navbar by making the "Invites" item bounce and give it a bright background color.
- [ ] [MERNSTACK-228] The "Find" on the homepage has to transition between color using "color transitions" from TailwindCSS.
- [x] [MERNSTACK-227] Dropdown menu items have to become clickable over the full width of the menu instead only the text and icon
- [ ] [MERNSTACK-230] README.md: Finish tutorial about asynchronous JavaScript: <https://www.youtube.com/watch?v=ZYb_ZU8LNxs&ab_channel=freeCodeCamp.org>
- [x] [MERNSTACK-131] Set state for all companies fields that can be edited in EditCompany.jsx
- [x] [MERNSTACK-127] Add state for all companies fields that can be registered in RegisterCompany.jsx
- [x] [MERNSTACK-128] In RegisterCompany.jsx: Add form inputs of all fields that the owner should fill in to register a company. Copy paste the following outer div with .my-4 class to achieve this
- [ ] [MERNSTACK-231] Use useSnackbar to UNDO steps users have taken, to start, let a user un-invite a co-owner after sending a invite and let the user UNDO removing a owner from a company. (see: <https://notistack.com/features/basic#actions>)
- [x] [MERNSTACK-232] Add a "data-test-id" attribute to all elements with an onClick and onChange event handler.
- [ ] [MERNSTACK-232] Find a pretty loading spinner animation to replace the ugly `<Spinner />`
- [ ] [MERNSTACK-234] PRIO: Finish Google Docs doc about making webapp DEMO video of application.
- [ ] [MERNSTACK-235] PRIO: Record first DEMO video briefly demonstrating what technology I use and what is the result.
- [ ] [MERNSTACK-238] PRIO: Edit first DEMO video, make sure to add an explanation of the functionalities of the application and what kind of technologies were used. START OF with demonstrating the client side app and LATER technical explanation.
- [ ] [MERNSTACK-236] PRIO: Upload DEMO video to YouTube and link to the video's in README.md and Github profile.
- [ ] [MERNSTACK-237] PRIO: Add DEMO links to new LinkedIn profile. Explain on LinkedIn profile that I also have another account and that I can't access it anymore.
- [ ] [MERNSTACK-239] Implement ERROR logging to error log files everywhere console.log is used.
- [ ] [MERNSTACK-240] Remove all debug data printing console.logs and keep useful error logs. Clean up the debug data flow.
- [x] [MERNSTACK-241] PRIO: Evaluate all `Company` field descriptions and make them correct.
- [ ] [MERNSTACK-242] Fade dropdown menu in and out with quickly with customized animation defined in tailwind.config.js.
- [ ] [MERNSTACK-243] Implement localization library for multi-language support
- [x] [MERNSTACK-244] Clean up everything `Book` related.
- [x] [MERNSTACK-226] When you click somewhere else besides the dropdown menu, the dropdown should close in Navbar.jsx
- [x] [MERNSTACK-246] Add useSnackbar notification after successful profile image upload.

## Technologies

## Frontend

On the frontend, I've chosen React for building user interfaces and Redux for state management. For those less familiar with these technologies, here's why implementing Redux in React is a game-changer:

### React

React is a popular JavaScript library for building user interfaces. It provides a declarative syntax for defining UI components, and uses a virtual DOM to efficiently update the UI in response to changes in state. Some of the main advantages of React include:

- **Declarative syntax:** React provides a simple and intuitive syntax for defining UI components, making it easy to reason about the structure and behavior of your application.

- **Efficient updates:** React uses a virtual DOM to efficiently update the UI in response to changes in state, minimizing the number of DOM manipulations required.

- **Component reusability:** React components are modular and reusable, making it easy to build complex UIs from simple building blocks.

- **Large ecosystem:** React has a large and active ecosystem of libraries and tools, making it easy to find solutions to common problems and integrate with other technologies.

### Redux

Redux is a state management library that is often used in conjunction with React. It provides a centralized store for managing application state, and uses a unidirectional data flow to ensure that state changes are predictable and easy to reason about. Some of the main advantages of using Redux with React include:

- **Centralized state management:** Redux provides a centralized store for managing application state, making it easy to manage and reason about complex state interactions.

- **Predictable state changes:** Redux uses a unidirectional data flow to ensure that state changes are predictable and easy to reason about, making it easier to debug and maintain your application.

- **Time-travel debugging:** Redux provides a powerful debugging tool called "time-travel debugging", which allows you to step through state changes and see how your application state evolves over time.

- **Ecosystem integration:** React and Redux have large and active ecosystems of libraries and tools, making it easy to integrate with other technologies and solve common problems.

### Vite.js

The React frontend application was installed using Vite.js, a modern build tool that provides fast development server and efficient build process.

- **Faster development:** Vite.js provides a fast development server that supports near-instantaneous hot module replacement (HMR) for React components. This means that changes to your code are reflected in the browser almost immediately, without requiring a full page reload. This can speed up the development process and make it easier to iterate on code.

- **Efficient builds:** Vite.js uses a highly optimized build process that leverages the native ES modules support in modern browsers. This can result in faster build times and smaller bundle sizes compared to other build tools.

- **Modern web technologies:** Vite.js supports modern web technologies out of the box, including ES modules, TypeScript, and CSS modules. This makes it easy to build modern, high-performance web applications.

- **Plugin ecosystem:** Vite.js has a growing ecosystem of plugins that can be used to extend its functionality. This includes plugins for things like CSS preprocessing, image optimization, and more.

## Backend

In the backend, I've set up RESTful API endpoints to create, read, update, and delete documents from collections. These collections are defined and configured in the `/backend/models` folder, ensuring a structured and organized approach to data management.

### Express.js

#### Efficient Routing

Express.js provides a robust routing system, making it seamless to define endpoints for handling various HTTP methods like GET, POST, PUT, and DELETE. This helps in organizing the backend logic effectively, ensuring clean and maintainable code.

#### Middleware Support

Express.js offers a wide range of middleware options that can be easily integrated into the application's request-response cycle. This enables functionalities like request parsing, authentication, logging, and error handling, enhancing the security and performance of the backend.

#### Streamlined Database Interactions

When combined with database libraries like Mongoose (for MongoDB), Express.js simplifies the process of interacting with the database. This allows for smooth retrieval, creation, updating, and deletion of data, which is essential for building a robust API.

#### Asynchronous Request Handling

Express.js supports asynchronous programming paradigms, allowing for non-blocking I/O operations. This is crucial for handling multiple concurrent requests efficiently, ensuring optimal performance even under heavy loads.

#### Cross-Origin Resource Sharing (CORS)

Cross-Origin Resource Sharing (CORS) is a critical security feature that safeguards my application from unwanted sources attempting to access your resources. Express.js provides built-in support for CORS, making it easy to configure and enforce CORS policies. This helps in preventing malicious attacks like cross-site scripting (XSS) and cross-site request forgery (CSRF). It also helps in preventing unauthorized access to sensitive data.

Overall, Express.js provides a robust and secure foundation for building RESTful APIs.

### MongoDB and Mongoose

**MongoDB** is a popular NoSQL database that provides a flexible and scalable solution for storing and retrieving data. It uses a document-based data model, which means that data is stored in JSON-like documents instead of tables and rows. This makes it easy to store and retrieve complex data structures, and allows for more flexible data modeling compared to traditional relational databases.

**Mongoose** is a popular Node.js library that provides a convenient and flexible way to interact with MongoDB. It provides a schema-based approach to defining and creating models, which makes it easier to validate and enforce data consistency. It also provides a wide range of data types and validators, making it easy to ensure that my data is stored correctly and consistently.

**Mongoose** also provides a built-in query builder that allows you to construct complex queries using a fluent API. This makes it easy to build queries that are easy to read and understand, and can be easily modified and reused.

**Mongoose** also provides a middleware system that allows you to add custom behavior to your models. This includes things like pre- and post-save hooks, virtual properties, and more. This makes it easy to add custom behavior to your models without having to modify the underlying schema.

Overall, **Mongoose** provides a convenient and flexible way to interact with **MongoDB**, and it is widely used in the Node.js community for this purpose.

#### Many-to-Many Relationships

One interesting aspect of this project is handling many-to-many relationships between companies and projects. In real-world scenarios, companies often take part in multiple projects, and a single project can involve multiple companies. To achieve this, I'll be using a `junction` collection in MongoDB.

The main advantage of using a `junction` collection is that it simplifies the management of these relationships. For instance, consider a scenario where Company A and Company B collaborate on Project X. Instead of duplicating data or creating complex nested structures, the `junction` collection allows us to create a clear and efficient link between Company A, Company B, and Project X. This makes it easy to track participation and configure revenue sharing settings dynamically when all parties agree.

### Secure User Authentication with JWT

In this repository, I implement secure user authentication using JSON Web Tokens (JWT). This approach offers several advantages over traditional session-based authentication methods. Below are key reasons why JWT-based authentication is a safe and effective choice:

#### Stateless Nature

JWTs are stateless, meaning they do not require server-side storage of session data. This eliminates the need for server-side sessions or database queries to validate user authenticity. Instead, the server can validate the token by checking its signature and expiration date, resulting in improved scalability and reduced server load.

#### Data Integrity and Confidentiality

JWTs are digitally signed using a secret key known only to the server. This signature ensures that the token's content has not been tampered with during transmission. Additionally, sensitive information can be encrypted within the token, providing an extra layer of security.

#### Cross-Origin Resource Sharing (CORS) Support

JWTs can be easily integrated with Cross-Origin Resource Sharing (CORS) policies. This allows for secure communication between the client and server even when they reside on different domains, without compromising security.

#### Granular Permissions

JWTs can include custom claims, allowing for fine-grained control over user permissions. This means you can specify which resources or actions a user is allowed to access, providing a robust authorization mechanism.

#### Easy Integration with Frontend Frameworks

JWTs can be conveniently stored on the client side, typically in browser cookies or local storage. This facilitates seamless integration with frontend frameworks and libraries (like React), enabling a smooth user experience.

#### Expiration and Refresh Tokens

JWTs can be configured with expiration times, reducing the window of opportunity for potential attackers. Additionally, you can implement refresh tokens to obtain new JWTs without requiring users to re-enter their credentials.

#### Conclusion

By implementing user authentication with JWTs, this repository ensures a robust and secure authentication mechanism. The stateless nature, data integrity, and ease of integration make JWTs an excellent choice for validating user authenticity. With careful implementation and adherence to best practices, this approach provides a reliable foundation for secure user authentication in my application.

### ES Lint

I'm using **ES Lint** to get my code up-to-date with strict code standards. I am still busy working on my own personal configuration.

![ES Lint in VS Code](![Invite Accepted](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/Using-ES-Lint.png?raw=true)

#### Frontend config:

> **Source:** [/frontend/.eslint.cjs](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/frontend/.eslintrc.cjs)

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:all',
    'plugin:react/all',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/strict',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'consistent-return': 'off',
    'max-lines-per-function': 'off',
    'no-magic-numbers': 'off',
    'no-nested-ternary': 'off',
    'no-ternary': 'off',
    'no-warning-comments': 'off',
    'one-var': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/display-name': 'error',
    'react/forbid-component-props': [
      'error',
      { allow: ['className'], forbid: [] },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-key': 'error',
    'react/jsx-max-depth': ['error', { max: 5 }],
    // Allow arrow functions in JSX props (Remove this rule when performance becomes an issue)
    'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-literals': 'off',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-render-return-value': 'error',
    'react/no-string-refs': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'error',
    'sort-imports': 'off',
    'sort-vars': 'off',
    'sort-keys': 'off',
    // TODO: Set the no-console rule to error when going in to production
    'no-console': 'warn',
  },
  settings: {
    react: {
      linkComponents: [
        // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
        'Hyperlink',
        { linkAttribute: 'to', name: 'Link' },
      ],
      version: 'detect',
    },
  },
}
```

#### Backend config:

> **Source:** [/backend/.eslint.cjs](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/backend/.eslintrc.cjs)

```javascript
'use strict'

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:all',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'new-cap': 'off',
    'no-magic-numbers': 'off',
    'one-var': 'off',
    'sort-imports': 'off',
    'sort-vars': 'off',
    'sort-keys': 'off',
    'no-console': 'off',
    'multiline-comment-style': 'off',
  },
}
```

### Prettier code formatter

I use Prettier code formatter to format my code in a way I find most readable.

> **Source:** [/frontend/.prettierrc](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/frontend/.prettierrc) and [/backend/.prettierrc](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/backend/.prettierrc)

```json
{
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "trailingComma": "all",
  "jsxSingleQuote": true,
  "bracketSpacing": true,
  "endOfLine": "lf"
}
```

## Project management

### Jira

Im using a **Jira** board with 4 swim lanes: TODO, IN PROGRESS, BUSY and DONE to sort my project issues.

![Jira Board](https://github.com/ThomPoppins/MERN_STACK_PROJ./blob/main/screenshots/Jira-Board.png?raw=true)

**TODO** issues I haven't started working on yet.

**IN PROGRESS** issues are in progress.

**BUSY** issues are the issues I am working on and have higher priority to finish. A lot of the times other issues are dependent on the **BUSY** issues, that's the main reason I chose to add this swim lane.

**DONE** issues are finished.
