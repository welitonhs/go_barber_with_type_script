# Project Name: PROJECT NODE

# Functionalities

  ## Recovery Password
    **RF**
      [x] - Users must be able to recover their passwords using their emails.
      [x] - Users must receive an e-mail with instructions for recovering your password.
      [x] - Users must be able to reset their password.
    **RNF**
      [x] - Ethereal to test emails on the development environment.
      [] - Amazon SES to send e-mails on the production environment.
      [] - The emails must be sent on background. (Background job)
    **RNF**
      [x] - The link sent by e-mail for the user to recover the password must expire in two hours.
      [] - The new password must be informed and re-enter.

  ## Profile Update
    **RF**
      [x] - Users must be able to update your name, email, and password.
    **RNF**

    **RNF**
      [x] - Users are not able to update your e-mail with an email already exists.
      [] - To update your password the user must enter his current password and inform and re-enter his new password.

  ## Providers Panel
    **RF**
      [] - The provider must be able to list your appointments on a specific day.
      [] - The provider must receive a notification when any user makes an appointment with him.
      [] - The provider must be able to see notifications, unread.
    **RNF**
      [] - The provider appointments must be saved on the cache.
      [] - The notifications must be persisted in MongoDB.
    **RNF**
      [] - The provider must see only your appointments.
      [] - The notifications must send with SOCKET.IO

  ## Services Appointments
    **RF**
      [] - The user must be able to list all service providers registered.
      [] - The user must be able to list a calendar with available dates to make an appointment with a service provider.
      [] - The user must be able to see available hours on a day to make an appointment with a service provider.
      [] - The user must be able to make an appointment on an available day and time with a service provider.
    **RNF**
      [] - List with service providers must be saved on the cache.
    **RNF**
      [] - Each appointment must last one hour.
      [] - Appointments must be available between 8 am and 6 pm.
        [] - First appointment on 8 am.
        [] - Last appointment on 17 pm.
      [] - The user can't make an appointment on an unavailable day and time.
      [] - The user can't make an appointment on past day and time.
      [] - The user can't make an appointment with yourself.

## Dependencies

- Production

  - express
  - uuidv4
  - date-fns
  - typeorm
  - pg
  - reflect-metadata
  - bcryptjs
  - jsonwebtoken
  - multer
  - express-async-errors
  - cors
  - tsyringe

- Development
  - typescript
  - @types/typescript
  - ts-node-dev
  - eslint@6.8.0
  - @typescript-eslint/eslint-plugin@latest
  - eslint-config-airbnb-base@latest
  - eslint-plugin-import@^2.21.2
  - @typescript-eslint/parser@latest
  - eslint-import-resolver-typescript
  - prettier
  - eslint-config-prettier
  - eslint-plugin-prettier
  - @types/bcryptjs
  - @types/jsonwebtoken
  - @types/multer
  - @types/cors
  - tsconfig-paths
  - jest
  - ts-jest
  - @types/jest
