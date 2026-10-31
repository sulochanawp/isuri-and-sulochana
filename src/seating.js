// ============================================================
//  SEATING ARRANGEMENT — guest lists
// ============================================================
//
// One guest per line: { table: '…', name: '…' },
//
// From a spreadsheet, add a column with this formula and copy it down
// (A = Tables, B = Guest Name), then paste the results into the list:
//
//   ="{ table: '"&A2&"', name: '"&SUBSTITUTE(B2,"'","\'")&"' },"
//
// Names are shown exactly as written (titles included) and sorted A–Z by
// first name, ignoring titles like Mr, Mrs, Ven. or "Mr & Mrs". Endings like
// "and Family" are shown in a lighter colour. When typing by hand, a name
// with an apostrophe needs a backslash: 'Mr Sean O\'Brien'.

export const SEATING = {
  bride: [
    { table: '32 / 33', name: 'Mr Saman Jayasinghe' },
    { table: '32 / 33', name: 'Mr Rohan Liyanage' },
    { table: '32 / 33', name: 'Mr Deeptha Sanjeewa' },
    { table: '32 / 33', name: 'Mr Kapila Mithrarathna' },
    { table: '32 / 33', name: 'Mr Dilusha Fernando' },
    { table: '32 / 33', name: 'Mr Sunil Obeyrathna' },
    { table: '32 / 33', name: 'Mr Lakmal Tissera' },
    { table: '32 / 33', name: 'Mr Thisara Suranga' },
    { table: '32 / 33', name: 'Mr Geeth Dulshan' },
    { table: '32 / 33', name: 'Mr Wathsala Gomez' },
    { table: '32 / 33', name: 'Mr Giorgio Montresor' },
    { table: '32 / 33', name: 'Mrs Rita Barros' },
    { table: '32 / 33', name: 'Mr Gioele Bisetto' },
    { table: '32 / 33', name: 'Mr Antimo Maiello' },
    { table: '32 / 33', name: 'Mr Davide Sparelli' },
    { table: '32 / 33', name: 'Mr Nicolo Martinelli' },
    { table: '32 / 33', name: 'Mr Mattia Pietropaolo' },
    { table: '32 / 33', name: 'Mr Gihan Rowell' },
    { table: '32 / 33', name: 'Mr Leema Sujith' },
    { table: '32 / 33', name: 'Mr Dhanushka Hettiarachchi' },
  ],

  groom: [
    { table: '32 / 33', name: 'Mr Saman Jayasinghe' },
    { table: '32 / 33', name: 'Mr Rohan Liyanage' },
    { table: '32 / 33', name: 'Mr Deeptha Sanjeewa' },
    { table: '32 / 33', name: 'Mr Kapila Mithrarathna' },
    { table: '32 / 33', name: 'Mr Dilusha Fernando' },
    { table: '32 / 33', name: 'Mr Sunil Obeyrathna' },
    { table: '32 / 33', name: 'Mr Lakmal Tissera' },
    { table: '32 / 33', name: 'Mr Thisara Suranga' },
    { table: '32 / 33', name: 'Mr Geeth Dulshan' },
    { table: '32 / 33', name: 'Mr Wathsala Gomez' },
    { table: '32 / 33', name: 'Mr Giorgio Montresor' },
    { table: '32 / 33', name: 'Mrs Rita Barros' },
    { table: '32 / 33', name: 'Mr Gioele Bisetto' },
    { table: '32 / 33', name: 'Mr Antimo Maiello' },
    { table: '32 / 33', name: 'Mr Davide Sparelli' },
    { table: '32 / 33', name: 'Mr Nicolo Martinelli' },
    { table: '32 / 33', name: 'Mr Mattia Pietropaolo' },
    { table: '32 / 33', name: 'Mr Gihan Rowell' },
    { table: '32 / 33', name: 'Mr Leema Sujith' },
    { table: '32 / 33', name: 'Mr Dhanushka Hettiarachchi' },
  ],
}
