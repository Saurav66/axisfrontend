import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UrlConstants } from "../../../global/UrlConstants";
import { MenuItem } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        Typography: {
            color: "black",
            paddingTop: "0.3rem",
            paddingLeft: "2.2rem",
            textAlign: "left",
        },
        input: {
            minWidth: 290,
            minHeight: 27,
        },
        select: {
            width: 290,
            height: 27,
        },
        mainBox: {
            backgroundColor: "#f2f1ed",
        },
        root: {
            width: 360,
        },
    })
);

export default function AddAiet(props: any) {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const [circleOptions, setCircleOptions] = useState([]);
    const [citiOptions, setCitiOptions] = useState([]);
    const [edit, setEdit] = useState(props.history.location.state?.data);
    const [employeeData, setEmployeeData] = useState({
        id: edit?.id ?? "",
        name: edit?.name ?? "",
        phone: edit?.phone ?? "",
        circle: edit?.circle ?? "",
        city: edit?.city ?? "",
        password: edit?.password ?? "",
        role: edit?.role ?? "aeit",
        status: edit?.status ?? "Active",
    });

    useEffect(() => {
        document.title = edit ? `Update Employee` : `Add Employee`;
        if (circleOptions.length === 0) {
            getCircles();
        }
        if (citiOptions.length === 0) {
            getAllCitiFromSurvey();
        }
    }, []);

    const getAllCitiFromSurvey = async () => {
        const response = await axios
            .get(`${UrlConstants.baseUrl}/getAllCitiFromSurvey`)
            .then((response: any) => {
                return response.data;
            })
            .catch((error) => { });
        setCitiOptions(response);
    };

    const getCircles = async () => {
        const response = await axios
            .get(`${UrlConstants.baseUrl}/getAllCircles`)
            .then((response: any) => {
                return response.data;
            })
            .catch((error) => { });
        setCircleOptions(response);
    };

    const handleValidation = () => {
        if (!employeeData.name) {
            toast.error("Please Enter your name!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
        if (!employeeData.circle) {
            toast.error("Please Enter Circle!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
        if (!employeeData.city) {
            toast.error("Please Enter City!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
        if (!edit && !employeeData.password) {
            toast.error("Please Enter Password!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
        return true;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (handleValidation()) {
            if (edit) {
                axios
                    .patch(`${UrlConstants.baseUrl}/updateEmployee/loggedInUserId/${localStorage.getItem("id")}`, employeeData)
                    .then(function (response) {
                        toast.success("Successfully Updated!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setTimeout(() => history.push("/aeit"), 700);
                    })
                    .catch(function (error) {
                        toast.error(`User Already Exists for: ${employeeData.phone}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    });
            } else {
                axios
                    .post(`${UrlConstants.baseUrl}/addEmployee/loggedInUserId/${localStorage.getItem("id")}`, employeeData)
                    .then(function (response) {
                        console.log(response);
                        console.log("sucessfully added");
                        toast.success("Successfully saved!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        history.push("/aeit");
                    })
                    .catch(function (error) {
                        toast.error(`User Already Exists for: ${employeeData.phone}`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    });
            }
        }
    };

    const handleInputChange = (event: any) => {
        if (event.target.name === "circle") {
            setEmployeeData({
                ...employeeData,
                circle: event.target.value,
                phone: `AEIT-${event.target.value}`?.replaceAll(' ', '-'),
            });
        } else {
            setEmployeeData({
                ...employeeData,
                [event.target.name]: event.target.value,
            });
        }
    };

    const handleCancel = (e: any) => {
        e.preventDefault();
        history.goBack();
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "0.8rem",
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
                className={classes.mainBox}
            >
                <Paper className={classes.root} elevation={16}>
                    <Typography
                        variant="h4"
                        sx={{ paddingTop: 6, paddingBottom: 3, fontFamily: "sans-serif" }}
                    >
                        {edit ? `Update AEIT` : `Add AEIT`}
                    </Typography>
                    <Typography className={classes.Typography}>* AEIT Name</Typography>
                    <Grid item xs>
                        <Box>
                            <input
                                className={classes.input}
                                autoComplete="new-password"
                                name="name"
                                value={employeeData.name}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Typography className={classes.Typography}>* Circle</Typography>
                        <select
                            className={classes.select}
                            name="circle"
                            value={employeeData.circle}
                            onChange={handleInputChange}
                        >
                            <option value={edit ? employeeData.circle : `pleaseSelect`}>
                                {edit ? employeeData.circle : `Please Select`}
                            </option>
                            {circleOptions.map((x, y) => (
                                <option key={y} value={x}>
                                    {x}
                                </option>
                            ))}
                        </select>
                    </Grid>
                    <Grid className={classes.input} item xs>
                        <Typography className={classes.Typography}>
                            * AEIT Username (For Tickets)
                        </Typography>
                        <Box>
                            <input
                                disabled
                                className={classes.input}
                                autoComplete="new-password"
                                name="phone"
                                // value={employeeData.phone}
                                value={employeeData?.phone}
                                type="tel"
                                onChange={handleInputChange}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <Typography className={classes.Typography}>
                            * City / Town (For Survey)
                        </Typography>
                        <Box>
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    name="city"
                                    size="small"
                                    label="City"
                                    value={employeeData?.city}
                                    onChange={handleInputChange}
                                >
                                    {citiOptions.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    {!edit && (
                        <Grid className={classes.input} item xs>
                            <Typography className={classes.Typography}>* Password</Typography>
                            <Box>
                                <input
                                    className={classes.input}
                                    autoComplete="new-password"
                                    name="password"
                                    value={employeeData.password}
                                    type="tel"
                                    onChange={handleInputChange}
                                />
                            </Box>
                        </Grid>
                    )}

                    <Grid item xs>
                        <Typography className={classes.Typography}>Status</Typography>
                        <select
                            className={classes.select}
                            id="product"
                            name="status"
                            value={employeeData.status}
                            onChange={handleInputChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </Grid>
                    <Button
                        variant="outlined"
                        style={{
                            color: "white",
                            backgroundColor: "#900080",
                            marginTop: 20,
                            marginRight: 4,
                            marginBottom: 20,
                            minWidth: 100,
                        }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{
                            color: "white",
                            backgroundColor: "#f44336",
                            marginTop: 20,
                            marginBottom: 28,
                            minWidth: 100,
                        }}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Paper>
            </Box>
            <ToastContainer />
        </div>
    );
}
