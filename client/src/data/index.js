// key is based on C=1, Db = 2, D = 3, etc.

export const instruments = {
  brass: {
    trumpet: {
      name: "trumpet",
      family: "brass",
      key: 11,

      bullets: ["buzz in the middle", "breath + 'tah'"],

      topics: {
        pedagogy: [
          {
            title: "First Sounds",
            content: "Buzz like this.",
            img: "https://banddirectorstalkshop.com/wp-content/uploads/2016/11/Example-1.jpg",
            embedAudio:
              "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/104190173&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
          },
        ],
        repair: [
          {
            title: "repair topic",
            content: "repair topic content lorem ipsum yada yada",
            img: null,
          },
        ],
      },
    },
  },
};

export const notes = [
  "c",
  "db",
  "d",
  "eb",
  "e",
  "f",
  "gb",
  "g",
  "ab",
  "a",
  "bb",
  "b",
];

// half steps from middle C to written equivalent
export const trans = {
  trumpet: 2,
  frenchHorn: 7,
  clarinet: 2,
  altoSaxophone: 9,
  trombone: -12,
};
