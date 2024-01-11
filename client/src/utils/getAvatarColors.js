import * as colors from '@mui/material/colors';

export default function getAvatarColor(avatarLetter) {
  const colorArray = [
    colors.red[500], colors.pink[500], colors.purple[500], colors.deepPurple[500],
    colors.indigo[500], colors.blue[500], colors.lightBlue[500], colors.cyan[500],
    colors.teal[500], colors.green[500], colors.lightGreen[500], colors.lime[500],
    colors.yellow[500], colors.amber[500], colors.orange[500], colors.deepOrange[500],
    colors.blueGrey[500], colors.red[500], colors.red[500], colors.orange[500], colors.orange[500],
    colors.pink[500], colors.purple[500], colors.deepPurple[500],
    colors.indigo[500], colors.blue[500], colors.lightBlue[500], colors.cyan[500],
    colors.yellow[500], colors.amber[500], colors.orange[500], colors.deepOrange[500],
  ];

  const index = avatarLetter.charCodeAt(0) % colorArray.length;
  return colorArray[index];
}
