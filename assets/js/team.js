// User data configuration
const USERS = [
  {
    id: 1,
    name: "Yaser",
    title: "Vice President",
    description:
      "Yaser Yjjou, Vice President and Founder of<br />the Robotics Club CMC Rabat, passionate<br />about innovation, technology, and<br />advancing robotics within the community.",
    image: "./assets/images/team/YaserYjjou-2.png",
    number: "01",
  },
  {
    id: 2,
    name: "Sarah",
    title: "Tech Lead",
    description:
      "Sarah Chen, Technology Lead and AI Specialist<br />at Innovation Hub, dedicated to pushing<br />the boundaries of machine learning and<br />creating intelligent solutions for tomorrow.",
    image: "./assets/images/team/user1.png",
    number: "02",
  },
  {
    id: 3,
    name: "Ahmed",
    title: "Project Manager",
    description:
      "Ahmed Alaoui, Senior Project Manager<br />specializing in agile development and<br />team coordination, bringing innovative<br />projects from concept to reality.",
    image: "./assets/images/team/user3.png",
    number: "03",
  },
  {
    id: 4,
    name: "Fatima",
    title: "UX Designer",
    description:
      "Fatima Zahra, Creative UX Designer with<br />expertise in user-centered design and<br />digital experiences, crafting intuitive<br />interfaces that users love.",
    image: "./assets/images/team/user2.png",
    number: "04",
  },
  {
    id: 5,
    name: "Omar",
    title: "Web Developer",
    description:
      "Omar Bennani, Full Stack Developer<br />passionate about creating scalable web<br />applications and exploring cutting-edge<br />technologies in the development space.",
    image: "./assets/images/team/user4.png",
    number: "05",
  },
];

const SELECTORS = {
  userName: "#userName",
  userTitle: "#userTitle",
  userDescription: "#userDescription",
  userImage: "#userImage",
  userNumber: "#userNumber",
  imageContainer: ".image_principale",
  clickTarget: ".personallity-img",
};

const CONFIG = {
  rotationDegrees: 360,
  transitionDuration: 1000,
  contentUpdateDelay: 500,
  autoChangeInterval: 10000,
  descriptionAnimationDuration: 400,
  typingSpeedBase: 80,
  typingSpeedVariation: 40,
  nameTypingDelay: 1500,
};

class UserCarousel {
  constructor(users, selectors, config) {
    this.users = users;
    this.selectors = selectors;
    this.config = config;
    this.currentIndex = 0;
    this.currentRotation = 0;
    this.isTransitioning = false;

    this.elements = this.getElements();
    this.init();
  }

  getElements() {
    const elements = {};
    for (const [key, selector] of Object.entries(this.selectors)) {
      elements[key] = document.querySelector(selector);
    }
    return elements;
  }

  updateUserName(name) {
    const element = this.elements.userName;

    element.innerHTML = '<span class="typing-cursor">|</span>';

    if (!element.classList.contains("typing-setup")) {
      element.style.position = "relative";
      element.classList.add("typing-setup");
    }

    let i = 0;
    const typeChar = () => {
      if (i < name.length) {
        element.innerHTML =
          name.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
        i++;
        setTimeout(typeChar, 80 + Math.random() * 40);
      } else {
        let flashes = 0;
        const flashCursor = () => {
          const cursor = element.querySelector(".typing-cursor");
          if (cursor && flashes < 6) {
            cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
            flashes++;
            setTimeout(flashCursor, 300);
          } else if (cursor) {
            cursor.style.opacity = "0";
          }
        };
        flashCursor();
      }
    };

    setTimeout(() => {
      setTimeout(typeChar, 200);
    }, this.config.nameTypingDelay);
  }

  updateUserTitle(title) {
    this.elements.userTitle.textContent = title;
  }

  updateUserDescription(description) {
    const element = this.elements.userDescription;

    element.style.transform = "translateX(-20px)";
    element.style.opacity = "0";

    setTimeout(() => {
      element.innerHTML = description;

      element.style.transform = "translateX(20px)";

      requestAnimationFrame(() => {
        element.style.transform = "translateX(0)";
        element.style.opacity = "1";
      });
    }, 200);
  }

  updateUserImage(src, alt) {
    this.elements.userImage.src = src;
    this.elements.userImage.alt = alt;
  }

  updateUserNumber(number) {
    this.elements.userNumber.textContent = number;
  }

  rotateImage() {
    this.currentRotation += this.config.rotationDegrees;
    this.elements.imageContainer.style.transform = `translateX(-50%) rotate(${this.currentRotation}deg)`;
  }

  updateContent(user) {
    setTimeout(() => {
      this.updateUserName(user.name);
      this.updateUserTitle(user.title);
      this.updateUserDescription(user.description);
      this.updateUserImage(user.image, `${user.name} Profile Image`);
      this.updateUserNumber(user.number);
    }, this.config.contentUpdateDelay);
  }

  transitionToUser(user) {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.rotateImage();
    this.updateContent(user);

    setTimeout(() => {
      this.isTransitioning = false;
    }, this.config.transitionDuration);
  }

  nextUser() {
    this.currentIndex = (this.currentIndex + 1) % this.users.length;
    this.transitionToUser(this.users[this.currentIndex]);
  }

  startAutoRotation() {
    setInterval(() => this.nextUser(), this.config.autoChangeInterval);
  }

  addClickHandler() {
    this.elements.clickTarget?.addEventListener("click", () => {
      if (!this.isTransitioning) {
        this.nextUser();
      }
    });
  }

  init() {
    const style = document.createElement("style");
    style.textContent = `
      .typing-cursor {
        animation: blink 1s infinite;
        font-weight: lighter;
        color: #2b9cb8;
      }
      
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
      
      .typing-setup {
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);

    if (this.elements.userDescription) {
      this.elements.userDescription.style.transition =
        "transform 0.2s ease-out, opacity 0.2s ease-out";
    }

    this.transitionToUser(this.users[0]);

    this.startAutoRotation();

    this.addClickHandler();
  }
}

const carousel = new UserCarousel(USERS, SELECTORS, CONFIG);

/* Section 3 */
function formatMemberNumber(num) {
  return num.toString().padStart(2, "0");
}

// Function to calculate years since joining
function calculateMemberSince(joinedYear) {
  const currentYear = new Date().getFullYear();
  const joinYear = parseInt(joinedYear.split("/")[0]);
  const yearsSince = currentYear - joinYear;
  return yearsSince >= 0 ? yearsSince : 0;
}

function renderTeamMembers(members) {
  const container = document.getElementById("teamContainer");
  const loading = document.getElementById("loading");

  loading.style.display = "none";

  container.innerHTML = "";

  members.forEach((member, index) => {
    const memberRow = document.createElement("div");
    memberRow.className =
      "row team-member-row d-flex align-items-center justify-content-center";

    // Calculate automatic memberSince based on joinedYear
    const memberSinceYears = calculateMemberSince(member.joinedYear);

    memberRow.innerHTML = `
                    <div class="col-md-1 d-flex align-items-center justify-content-center">
                        <p class="member-number">${formatMemberNumber(
                          member.id
                        )}</p>
                    </div>
                    <div class="col-md-2 d-flex align-items-center justify-content-center">
                        <img src="${member.image}" alt="${
      member.name
    }" class="member-image">
                    </div>
                    <div class="col-md-4 d-flex align-items-start justify-content-center flex-column">
                        <h3 class="member-name">${member.name}</h3>
                        <p class="member-joined">Joined us in <span class="_row3_our_team">:${
                          member.joinedYear
                        }</span></p>
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-md-3 d-flex align-items-center justify-content-center ">
                        <p class="member-since"><span class="Member_since">Member since </span>${memberSinceYears} years</p>
                    </div>
                `;

    container.appendChild(memberRow);
  });
}

async function loadTeamFromJSON() {
  try {
    const response = await fetch("./data/team.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    renderTeamMembers(data.members);
  } catch (error) {
    console.error("Error loading team data:", error);
    document.getElementById("loading").innerHTML =
      "Error loading team data. Please check if data/team.json exists.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadTeamFromJSON();
});
