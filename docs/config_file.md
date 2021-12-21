# Configuration file

The app uses a JSON configuration file to add modularity to its settings. It is
defined in the app's root, in a file called `config.json`.

A template for this file can be found as well in the root, in
`config.json.template`.

The file is an object with 3 keys, one for each environment: `development`,
`test` and `production`. Each of these keys contain an object with **the exact
same structure**, namely:

- `server`
	- `port`: which port should the app be listening to.
	- `publicURL`: URL that the users will see when browsing the app. Keep in
	mind the effect that reverse proxies, if any, might have on this value.
	- `sessionSecret`: a long, crypto-safe random string that will be used to
	hash user sessions. A weak secret can compromise them, so please make sure
	to use a strong one.
	- `passwordSaltRounds`: how many hasing rounds should be used for passwords
	stored in the database. This protects passwords stored in the database from
	brute force attacks should it ever be compromised, by increasing the
	computing efforts required to hash a password. As a result, a greater value
	here will also make user logins slower. Choose a value that is a good
	compromise between both (as of 2021, a value of 13 seems appropiate).
- `email`: settings for the notifications sent by the app via email.
	- `adminFrom`: the sender that should be used for emails sent by the app.
	The format is compatible with RFC5322 (i.e. `Name <address@domain.com>`),
	including unicode characters.
	- `smtp`: host & credentials for the email service provider that the app
	should use. Please see [this section](#emails-in-development) for tips on
	doing this in development environments.
		- `host`
		- `port`
		- `auth`
			- `user`
			- `pass`
- `database`
	- `host`
	- `port`
	- `database`: name of the database to use. Sequelize will create a database
	with this name if you run `yarn db:create`.
	- `username`
	- `password`
	- `dialect`: the [dialect](https://sequelize.org/v5/manual/dialects.html)
	for the app's database. If you are using PostgreSQL as recommended, you
	should put `postgres` here.

## Emails in development

It might be impractical to send actual emails when trying out features in
development. It is therefore useful to use a service that allows mocking email
delivery, like [Ethereal Email](https://ethereal.email).

This service **does not provide disposable email addresses**, but a mock SMTP
server that registers all the emails sent through it. **Emails sent with that
server will not be delivered to the recipient.**

If you go to their website and create and account, you will be provided with a
random set of credentials that you can use instead of a real SMTP server.
Whenever the app sends an email, it will appear in the [service's
mailbox](https://ethereal.email/messages). Keep in mind that the mailbox is like
the *Sent* folder of the app's email address, **it is not an inbox**.

That way, you can have an idea of how will emails look like and check their
contents when developing.