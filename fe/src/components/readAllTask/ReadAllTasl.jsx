import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Delete, ModeEdit } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useGlobalVar } from "../../GlobalContext/Global";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function RecipeReviewCard({ key, title, content }) {
  const [expanded, setExpanded] = React.useState(false);

  const { UserData } = useGlobalVar();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (UserData.roles === undefined)
    return (
      <Grid
        container
        flexDirection={"row"}
        width={"100vw"}
        height={"100vh"}
        justifyContent={"center"}
        mt={8}
      >
        Loading
      </Grid>
    );

  return (
    <Card fullwidth key={key}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          UserData.roles.includes("admin") && (
            <Grid container flexDirection={"row"} gap={1}>
              <IconButton aria-label="settings">
                <ModeEdit />
              </IconButton>
              <IconButton aria-label="settings">
                <Delete />
              </IconButton>
            </Grid>
          )
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography sx={{ marginBottom: 2 }}>{title}:</Typography>
        {content.length > 1000 ? (
          <>
            <Collapse in={!expanded} timeout="auto" unmountOnExit>
              <Typography>{content.slice(0, 1000)}...</Typography>
            </Collapse>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography>{content}</Typography>
            </Collapse>
          </>
        ) : (
          <Typography>{content}</Typography>
        )}{" "}
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
