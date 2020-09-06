# Ventes Pav

This app is made to temperately help a call center department to track their sales in order to obtain their commission by the end of the month.

It keeps track of the sales according to the agent input and it's well controlled by a form.

# Stack

- Library: ReactJs
- UI Framework: [Semantic UI React](https://react.semantic-ui.com/)
- Formik
- Yup
- Bundler: [ParcelJs](https://parceljs.org/)
- ElectronJs _(In ELEC-VER.1 branch)_
- Git lfs to track big file _(Built electron app)_

Here we have two categories of the app distributed on branches.

# Ver.1 and Ver.2

Both are web apps, **Ver.1** uses localStorage to store records, and **VER.2** uses IndexedDB to store data using **_idb-keyval_** wrapper.

# ELEC-VER.1

An electron app to have access on **fs** to store data in a relative JSON file.

# ELEC-DOWNLOAD

A branch used to deploy a link to download a built version of the electron app to outpass some network restriction to transfer sites.
