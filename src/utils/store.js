const cards = [
  {
    id: "card-1",
    title:
      "Your data is stored only in your browsers local storage. Clearing your site data clears data here too.",
  },
  {
    id: "card-11",
    title:
      "You can create as many lists and cards as you want, drag and drop both cards and lists. Edit or delete cards and list titles. Enjoy 👍",
  },
  {
    id: "card-12",
    title:
      "Give it a try on mobile too 📱",
  },
  {
    id: "card-2",
    title: "Attend meeting with remote team",
  },
  {
    id: "card-3",
    title: "Give an update to executives and product managers",
  },

  {
    id: "card-4",
    title: "Prepare pancakes for brunch ",
  },
  {
    id: "card-5",
    title: "Visit Tokyo Sky Tree after shopping 🗼",
  },
];

const data = {
  lists: {
    "list-1": {
      id: "list-1",
      title: "Sample Tasks 📝",
      cards,
    },
    "list-2": {
      id: "list-2",
      title: "In progress 🔄",
      cards: [
        {
          id: "card-6",
          title: "Prepare for Friday presentation",
        },
        {
          id: "card-7",
          title: "Finish amazon clone",
        },
      ],
    },
    "list-3": {
      id: "list-3",
      title: "Done ✔️",
      cards: [
        {
          id: "card-8",
          title:
            "Reply to clients email. Don't foget to call Tanakasan who wants to upgrade her plan to premium 📞",
        },
        {
          id: "card-9",
          title: "Go shopping with a friend",
        },
        {
          id: "card-10",
          title: "go to gym at 6 AM 💪",
        },
      ],
    },
  },
  listIds: ["list-1", "list-2", "list-3"],
};

export default data;
