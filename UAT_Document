# User Acceptance Testing (UAT) Document

**Project Name:** ChatBot_project
**Version:** 1.0
**Tested By:** Abhishek Malga
**Test Date:** October 30, 2025

---

## 1) Objective

To validate that the Discord chatbot (**Sample Chat Bot**) is functioning as expected — responding accurately to user inputs, registering slash and prefix commands, and maintaining stable connectivity with the Discord API.

---

## 2) Test Environment

| Component       | Details                                      |
| --------------- | -------------------------------------------- |
| **Platform**    | Discord                                      |
| **Server Name** | Abhishek’s server                            |
| **Channel**     | #bot-test                                    |
| **Framework**   | Node.js 18+                                  |
| **Library**     | discord.js v14                               |
| **Hosting**     | Local environment (Node runtime)             |
| **Files Used**  | index.js, register-commands.js, package.json |

---

## 3) Pre-Conditions

* The bot was registered in the **Discord Developer Portal**.
* All required **Intents** were enabled (`Guilds`, `GuildMessages`, `MessageContent`).
* `.env` file configured with valid credentials:

  ```bash
  DISCORD_TOKEN=
  CLIENT_ID=
  GUILD_ID=
  ```
* Slash commands registered using:

  ```bash
  node register-commands.js
  ```
* Bot was **invited** to the server with appropriate permissions.

---

## 4) Test Scenarios

| **Test ID** | **Scenario**                     | **Steps**                                 | **Expected Result**                                         | **Actual Result**           | **Status** |
| ----------- | -------------------------------- | ----------------------------------------- | ----------------------------------------------------------- | --------------------------- | ---------- |
| TC-01       | Validate bot startup             | Run `node index.js`                       | Bot logs in and displays “Bot logged in as Sample Chat Bot” | Bot started successfully    | ✅ Pass     |
| TC-02       | Verify “ping” message response   | In Discord channel, type `ping`           | Bot replies “pong ✅ (listener working)”                     | Responded correctly         | ✅ Pass     |
| TC-03       | Verify custom prefix command     | In Discord channel, type `!chat hello`    | Bot replies “I heard you: 'hello'”                          | Responded correctly         | ✅ Pass     |
| TC-04       | Test message filter              | Send random text not matching any command | Bot ignores the message                                     | Bot ignored irrelevant text | ✅ Pass     |
| TC-05       | Test bot online/offline recovery | Restart bot                               | Bot reconnects automatically                                | Bot resumed connection      | ✅ Pass     |

---

## 5) Observed Behavior

* The bot successfully handled both **prefix commands** (`!chat`) and **plain message triggers** (`ping`).
* Responses were instantaneous (< 1 second).
* No errors, rate limits, or disconnects were observed during the test session.

---

## 6) Post-Conditions

* Bot remains online and responsive after multiple message triggers.
* Verified that all registered slash commands appear under `/` in Discord.

---

## 7) Attachments

**Screenshot:**
*UAT proof showing functional bot responses*
File: `Discord_UAT`

---

## 8) Conclusion

All test cases were executed successfully. The chatbot meets the functional and non-functional acceptance criteria for this release. The system is **approved for deployment** to the hosting environment (Render/Railway).

✅ **UAT Status:** Approved
📅 **Date Completed:** October 30, 2025
👤 **Tester:** Abhishek Malga
