// JSON data for users
const usersData = [
  {
    id: 1,
    name: "Yaser",
    title: "Vice President",
    description:
      "Yaser Yjjou, Vice President and Founder of<br />the Robotics Club CMC Rabat, passionate<br />about innovation, technology, and<br />advancing robotics within the community.",
    image:
      "./assets/bureau/YaserYjjou-2.png",
    number: "01",
  },
  {
    id: 2,
    name: "Sarah",
    title: "Tech Lead",
    description:
      "Sarah Chen, Technology Lead and AI Specialist<br />at Innovation Hub, dedicated to pushing<br />the boundaries of machine learning and<br />creating intelligent solutions for tomorrow.",
    image:
      "./assets/bureau/user1.png",
    number: "02",
  },
  {
    id: 3,
    name: "Ahmed",
    title: "Project Manager",
    description:
      "Ahmed Alaoui, Senior Project Manager<br />specializing in agile development and<br />team coordination, bringing innovative<br />projects from concept to reality.",
    image:
      "./assets/bureau/user3.png",
    number: "03",
  },
  {
    id: 4,
    name: "Fatima",
    title: "UX Designer",
    description:
      "Fatima Zahra, Creative UX Designer with<br />expertise in user-centered design and<br />digital experiences, crafting intuitive<br />interfaces that users love.",
    image:
      "./assets/bureau/user2.png",
    number: "04",
  },
  {
    id: 5,
    name: "Omar",
    title: "Web Developer",
    description:
      "Omar Bennani, Full Stack Developer<br />passionate about creating scalable web<br />applications and exploring cutting-edge<br />technologies in the development space.",
    image:
      "./assets/bureau/user4.png",
    number: "05",
  },
];

let currentUserIndex = 0;
let isTransitioning = false;

let currentRotation = 0;

function updateUserInfo(user) {
  if (isTransitioning) return;

  isTransitioning = true;

  // Get elements
  const userName = document.getElementById("userName");
  const userTitle = document.getElementById("userTitle");
  const userDescription = document.getElementById("userDescription");
  const userImage = document.getElementById("userImage");
  const userNumber = document.getElementById("userNumber");
  const imageContainer = document.querySelector(".image_principale");

  // Continue rotation by adding 360 degrees (full circle)
  currentRotation += 360;
  imageContainer.style.transform = `translateX(-50%) rotate(${currentRotation}deg)`;

  // At 180 degrees of this rotation (middle), update content
  setTimeout(() => {
    userName.textContent = user.name;
    userTitle.textContent = user.title;
    userDescription.innerHTML = user.description;
    userImage.src = user.image;
    userImage.alt = `${user.name} Profile Image`;
    userNumber.textContent = user.number;
  }, 500); // Middle of the 360-degree rotation

  // Complete the full rotation
  setTimeout(() => {
    isTransitioning = false;
  }, 1000); // Complete 360-degree rotation duration
}

function nextUser() {
  currentUserIndex = (currentUserIndex + 1) % usersData.length;
  updateUserInfo(usersData[currentUserIndex]);
}

// Start the carousel - change user every 5 seconds
setInterval(nextUser, 5000);

// Optional: Add click event to manually go to next user
document.querySelector(".personallity-img").addEventListener("click", () => {
  if (!isTransitioning) {
    nextUser();
  }
});

// Initialize with first user
updateUserInfo(usersData[0]);
