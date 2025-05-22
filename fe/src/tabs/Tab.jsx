import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CreateTask from "../components/createTask/CreateTask";
import MyTask from "../components/myTask/MyTask";
import Tasks from "../components/data/Index";
import { Button, Grid, Stack } from "@mui/material";
import { useState } from "react";
import SingleTask from "../components/myTask/SingleTask";
import RecipeReviewCard from "../components/readAllTask/ReadAllTasl";
import { instance } from "../Instance/Instanse";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(2);
  const [selected, setSelected] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [allTask, setAllTask] = useState({
    results: [],
    count: 0,
    next: null,
    previous: null,
  });
  const [newData, setnewData] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMyTask = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");

      console.log(token);

      const response = await instance.get("/tasks/mytask", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data.tasks);
      console.log(response);
    } catch (error) {
      setTasks([]);
      setError(JSON.stringify(error.response));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleAllTask = async (newUrl) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      let url = "/tasks/";

      if (newUrl) {
        const page = newUrl.split("/")[4];
        console.log(page);
        url = `/tasks/${page && `${page}`}`;
      }

      const response = await instance.get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setAllTask(response.data);
      console.log("all tasks", response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickSingleTask = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const task = await instance.get(`/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("this is single task", task);
      setSelected(task.data.task);
    } catch (error) {
      console.log("failed to get single task", error);
    }
  };

  React.useEffect(() => {
    if (!IsLoading) {
      handleMyTask();
      handleAllTask();
    }
  }, []);

  React.useEffect(() => {
    handleMyTask();
    handleAllTask();
  }, [newData]);

  if (IsLoading) return <>loading</>;

  return (
    <Grid container flexDirection={"column"} p={2}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Create Task" {...a11yProps(0)} />
        <Tab label="My Task" {...a11yProps(1)} />
        <Tab label="All Tasks" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0} dir={theme.direction}>
        <CreateTask
          newData={newData}
          setnewData={setnewData}
          setValue={setValue}
        />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        {selected ? (
          selected && (
            <SingleTask
              task={selected}
              setSelected={setSelected}
              setTasks={setTasks}
              newData={newData}
              setnewData={setnewData}
            />
          )
        ) : (
          <Grid
            container
            direction="row"
            sx={{
              flexWrap: "wrap",
              gap: "10px",
              p: 2,
              justifyContent: "start",
            }}
          >
            {tasks.length === 0 && (
              <Typography variant="body1" textAlign={"center"}>
                No Tasks
              </Typography>
            )}
            {tasks.map((task) => {
              const shortContent =
                task.content.length > 300
                  ? task.content.slice(0, 300) + "..."
                  : task.content;

              return (
                <MyTask
                  key={task._id}
                  {...task}
                  content={shortContent}
                  handleClick={() => handleClickSingleTask(task._id)}
                />
              );
            })}
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Grid container flexDirection={"column"} gap={2}>
          <Typography variant="h6" textAlign={"end"}>
            total tasks: {allTask.count || 0}
          </Typography>
          {allTask.results.map((task) => {
            return <RecipeReviewCard key={task._id} {...task} />;
          })}
          <Grid
            container
            flexDirection={"row"}
            gap={1}
            justifyContent={"center"}
          >
            <Button
              variant="contained"
              disabled={allTask.previous === null}
              onClick={() => handleAllTask(allTask.previous)}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              disabled={allTask.next === null}
              onClick={() => handleAllTask(allTask.next)}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </TabPanel>
    </Grid>
  );
}
