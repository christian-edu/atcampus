import { GroupDto } from '../dto/groupDto';
import { GroupCriteriaDto } from '../dto/groupCriteriaDto';
import { UserDto } from '../dto/userDto';
import { GroupMemberDto } from '../dto/groupMemberDto';

export const users = [
  new UserDto('Christian', 'Gregersen', 'chgr', 'chgr007@egms.no', 'drowssap'),
  new UserDto('Roman', 'Morso', 'romo', 'roman@morso.no', 'drowssap'),
  new UserDto('Sigurd', 'Kvamme', 'sikv', 'sikv007', 'drowssap'),
];

export const groupMembers = [
  new GroupMemberDto(users[0], true),
  new GroupMemberDto(users[1], false),
  // new GroupMemberDto(users[3], false),
];

export const groups = [
  new GroupDto(
    true,
    'Groyp',
    'Rules',
    new GroupCriteriaDto(
      'HK',
      'A',
      'W2',
      'Norsk',
      8,
      'Oslo',
      ['PG2351'],
      'HYBRID'
    ),
    'UUID',
    groupMembers
  ),
  new GroupDto(
    false,
    'Smidig Prosjekt',
    'Rules',
    new GroupCriteriaDto(
      'HK',
      'A',
      'W2',
      'Norsk',
      8,
      'Oslo',
      ['PG2351'],
      'HYBRID'
    ),
    'UUID',
    groupMembers
  ),
  new GroupDto(
    true,
    'Trofast Benk',
    'Rules',
    new GroupCriteriaDto(
      'HK',
      'A',
      'W2',
      'Norsk',
      8,
      'Oslo',
      ['PG2351'],
      'HYBRID'
    ),
    'UUID',
    groupMembers
  ),
  new GroupDto(
    false,
    'Prog',
    'Rules',
    new GroupCriteriaDto(
      'HK',
      'A',
      'W2',
      'Norsk',
      8,
      'Oslo',
      ['PG2351'],
      'HYBRID'
    ),
    'UUID',
    groupMembers
  ),
  new GroupDto(
    true,
    'Avansert Java',
    'Rules',
    new GroupCriteriaDto(
      'HK',
      'A',
      'W2',
      'Norsk',
      8,
      'Oslo',
      ['PG2351'],
      'HYBRID'
    ),
    'UUID',
    groupMembers
  ),
];
//
// export const groupNames = [
//   { groupname: "PRO201-G8", members: ["Lil J", "Per åge", "Bernt Kåre"] },
//   {
//     groupname: "TK2100",
//     members: ["Svein Torleif", "Bjertulf sveinson", "Sigurd Knutsen"],
//   },
//   { groupname: "Smidig prosjekt", members: ["Per Erling"] },
//   {
//     groupname: "Avansert Java",
//     members: ["Dag Marie", "Berntulf Jensen", "Kåre Uleifson"],
//   },
//   {
//     groupname: "PG6301 API Design",
//     members: ["Odgunn Bordsann", "Fredvar Komodesen"],
//   },
// ];
// export const subjectQuestions = [
//   {
//     subject: "Arbeidsmiljø og psykologi",
//     questions: [
//       {
//         student: "Stresset Student",
//         question: "Hei, innleveringen er imorhen, hvor mange ord?",
//         timeposted: "3 måneder siden",
//         likes: 1,
//         answers: [
//           { answer: "yes", votes: 10 },
//           { answer: "no", votes: -10 },
//         ],
//       },
//     ],
//   },
//   {
//     subject: "TK3210",
//     questions: [
//       {
//         student: "Bengt wannabe",
//         question: "Hvorfor er skolen så lett å hacke?",
//         timeposted: "2 minutter siden",
//         likes: 690,
//         answers: [
//           { answer: "Omg you are so smart", votes: 9 },
//           { answer: "Why would you even ask that", votes: 87 },
//           { answer: "Dumbest shit i have ever read", votes: 2 },
//           { answer: "this is another answer", votes: 420 },
//         ],
//       },
//     ],
//   },
//   {
//     subject: "Interpretetive dance",
//     questions: [
//       {
//         student: "Ulvar gossesen",
//         question:
//           "How can i increase my floorrolls (frps) per second when trying to describe a rolling car with 4 wheels?",
//         timeposted: "99 months ago",
//         likes: 12,
//         answers: [
//           {
//             answer:
//               "You could try to put fidgetspinners under your feet, that increased my frps by 24",
//             votes: 9999,
//           },
//           {
//             answer:
//               "I usually try to dress up as the subject matter, do you have any car costumes?",
//             votes: 777,
//           },
//           {
//             answer:
//               "If you cant figure this out by yourself, you cant really call yourself an interpretive dancer",
//             votes: -99,
//           },
//         ],
//       },
//     ],
//   },
// ];
