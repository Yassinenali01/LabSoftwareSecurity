

1.Secure storage of sensitive data: I'm using EncryptedStorage to securely store notes in the Notes component. This is a good practice for storing sensitive data.
Why is this important?:
    Sensitive data like API keys, access tokens, and user data should be stored securely to prevent unauthorized access. If an attacker gains access to this data, they could impersonate users, carry out actions on their behalf, or access sensitive information. Encrypting this data and using secure storage methods helps protect it from unauthorized access.

2.Secure authentication practices: The Login component uses bcrypt for password hashing, which is a secure practice.
Why is this important?:
    Implementing secure authentication practices is crucial to verify the identity of users and prevent unauthorized access. If authentication is not implemented securely, an attacker could impersonate a user and gain access to their data and actions. This could include practices like using strong password hashing algorithms, implementing multi-factor authentication, and securely handling password resets.

3.Input validation and sanitization The addNote method in the Notes component validates and sanitizes the input before adding a note. This is a good practice to prevent code injection vulnerabilities.
Why is this important?:
    Proper input validation and sanitization can prevent code injection attacks, where an attacker sends malicious input to exploit your application. This could lead to a range of attacks, from data theft to taking control of your server. By validating and sanitizing inputs, you can ensure that they do not contain malicious code.

Moving forward, several best practices can be implemented to mitigate potential risks:
    --Strong Password Policies: Enforce strong password policies, including minimum length, complexity requirements, and regular password rotation, to reduce the risk of brute-force attacks and password guessing.
       -- Continuous Monitoring and Testing: Implement continuous monitoring and testing processes, including penetration testing and vulnerability scanning, to proactively identify and mitigate security risks throughout the application's lifecycle. 
        -- Stay ahead with regular security audits
        -- Use trusted security frameworks and libraries

## References
[1] David Puzas "5 essential best practices for application security" link: https://newrelic.com/blog/best-practices/15-essential-best-practices-for-application-security