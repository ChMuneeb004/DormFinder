import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Header from "../Header";
import panorama from "./imagestitching2.jpg";
import panorama2 from "./stitchedOutput.jpg";
import panorama3 from "./Stiched.jpg";
import { Link } from "react-router-dom";

const HostelDetail = () => {
    const { id } = useParams();
    const [hostel, setHostel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stitchedImageUrl, setStitchedImageUrl] = useState("");

    useEffect(() => {
        const fetchHostel = async () => {
            try {
                if (!id) {
                    throw new Error("Invalid hostel ID");
                }

                const response = await axios.get(
                    `http://localhost:3001/hostel-detail/${id}`,
                    {
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache',
                            'Expires': '0'
                        }
                    }
                ).catch((error) => {
                    console.error("Hostel detail API error:", error);
                    throw new Error("Error fetching hostel details");
                });

                if (!response.data || !response.data.stitchedImages) {
                    throw new Error("Hostel data or stitchedImages not found");
                }
                setHostel(response.data);
                setStitchedImageUrl(response.data.stitchedImages);
                console.log("Hostel detail API response:", response.data);  // Log full response
                console.log("Stitched images:", response.data.stitchedImages);  // Log stitchedImages specifically
            } catch (error) {
                setError("Error fetching hostel details");
            } finally {
                setLoading(false);
            }
        };

        fetchHostel();
    }, [id]);

    
    // function getstitchImageUrl (image) {
    //     debugger;
    //     if (image && image[0]?.stitchedImages[0]?.data) {
    //         const img = `data:${"image/jpeg"};base64,${image[0]?.stitchedImages[0]?.data}`;
    //         return img
    //     }
    //     return "";
    // };

    function getStitchImageUrl(image) {
        if (image && image[0]?.stitchedImages[0]?.data) {
            const img = `data:${image[0]?.stitchedImages[0]?.contentType};base64,${image[0]?.stitchedImages[0]?.data}`;
            return img;
        }
        return "";
    }

    const panoramaUrl = getStitchImageUrl(stitchedImageUrl);
    console.log("Panorama URL:", panoramaUrl);

    useEffect(() => {
        if (!loading && hostel) {
            const loadPannellum = async () => {
                const css = document.createElement("link");
                css.rel = "stylesheet";
                css.href = "https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.css";
                document.head.appendChild(css);

                const script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/npm/pannellum/build/pannellum.js";
                script.onload = () => {
                    const panoramaUrl = getStitchImageUrl(stitchedImageUrl);
                    pannellum.viewer("panorama", {
                        type: "equirectangular",
                        panorama: panorama3,
                        autoLoad: true,
                    });
                };
                document.body.appendChild(script);
            };

            loadPannellum();
        }
    }, [loading, hostel]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!hostel) {
        return <div>No hostel found</div>;
    }

    const {
        images = [],
        roomImages = [],
        name = "",
        description = "",
        location = "",
        number_of_rooms = "",
        contact = "",
        hostel_type = "",
        rooms = [],
        amenities = [],
    } = hostel;

    // const des = `data:${description.contentType};base64,${bufferToBase64(
    //     description.data
    // )}`;

    function getAmenityNames(amenity) {
        let amenityNames = [];
        if (amenity.air_condition_check) amenityNames.push({ name: "Air Condition", icon: <i className="fa fa-snowflake-o" style={styles.icon}></i> });
        if (amenity.air_cooler_check) amenityNames.push({ name: "Air Cooler", icon: <i className="fa fa-snowflake-o" style={styles.icon}></i> });
        if (amenity.kitchen_check) amenityNames.push({ name: "Kitchen", icon: <i className="fa fa-cutlery" style={styles.icon}></i> });
        if (amenity.gasoline_check) amenityNames.push({ name: "Gasoline", icon: <i className="fa fa-fire" style={styles.icon}></i> });
        if (amenity.water_cooler_check) amenityNames.push({ name: "Water Cooler", icon: <i className="fa fa-tint" style={styles.icon}></i> });
        if (amenity.attached_bathroom_check) amenityNames.push({ name: "Attached Bathroom", icon: <i className="fa fa-bath" style={styles.icon}></i> });
        return amenityNames;
    }

    const getImageUrl = (image) => {
        if (image && image.data) {
            return `data:${image.contentType};base64,${image.data}`;
        }
        return "";
    };

    
    return (
        <>
            <Header />
            <div className="container my-4">
                <div className="row mb-4">
                    <div className="col-md-7">
                        <Carousel style={styles.carousel}>
                            {images.map((image, index) => (
                                <Carousel.Item key={index} interval={3000}>
                                    <img
                                        src={getImageUrl(image)}
                                        className="d-block w-100"
                                        alt={`Slide ${index}`}
                                        style={styles.carouselImage}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>

                    <div className="col-md-5">
                        <h2 className="mb-3 mt-3" style={styles.title}>
                            {name}
                        </h2>
                        <div className="card p-3 mb-3" style={{ ...styles.card, textAlign: 'left' }}>
                            <p>
                                <strong style={styles.label}><i className="fa fa-building" style={styles.icon}></i> Hostel Type:</strong>{" "}
                                <span style={styles.text}>{hostel_type}</span>
                            </p>
                            <p>
                                <strong style={styles.label}><i className="fa fa-bed" style={styles.icon}></i> Number of Rooms:</strong>{" "}
                                <span style={styles.text}>{number_of_rooms}</span>
                            </p>
                            <p>
                                <strong style={styles.label}><i className="fa fa-phone" style={styles.icon}></i> Contact:</strong>{" "}
                                <span style={styles.text}>{contact}</span>
                            </p>
                            <p>
                                <strong style={styles.label}><i className="fa fa-map-marker" style={styles.icon}></i> Location:</strong>{" "}
                                <span style={styles.text}>{location}</span>
                            </p>
                            {/* <p>
                                <strong style={styles.label}><i className="fa fa-info-circle" style={styles.icon}></i> Description:</strong>{" "}
                                <span style={styles.text}>{description}</span>
                            </p> */}
                        </div>
                    </div>
                </div>
                
                <div className="row mb-4">
                    <div className="col-md-6">
                        <h3 style={styles.subtitle}>Room Types and Prices</h3>
                        <div style={styles.roomsContainer}>
                            {rooms.map((room, index) => (
                                <div key={index} style={{ ...styles.roomItem, ...styles.hoverEffect }}>
                                    <h4 style={styles.roomType}>{room.room_type}</h4>
                                    <p style={styles.roomPrice}>Rs {room.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 style={styles.subtitle}>Amenities</h3>
                        <div style={styles.amenitiesContainer}>
                            {amenities.map((amenity, index) =>
                                getAmenityNames(amenity).map((amenityObj, nameIndex) => (
                                    <div key={`${index}-${nameIndex}`} style={{ ...styles.amenityItem, ...styles.hoverEffect }}>
                                        {amenityObj.icon}
                                        <span style={styles.amenityText}>{amenityObj.name}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <h3 style={styles.subtitle}>Overview</h3>
                        <p style={styles.text}>{description}</p>
                    </div>
                </div>
                 <div className="row mb-4">
                    <div className="col-12">
                        <h3 style={styles.subtitle}>360° View</h3>
                        <div className="card p-1" style={{ ...styles.card, ...styles.hoverEffect }}>
                            <div
                                id="panorama"
                                style={styles.panorama}
                            ></div>
                        </div>
                    </div>
                </div>
                {/* <div className="row mb-4">
                    <div className="col-12">
                        <h3>360° View</h3>
                        <div id="panorama" style={{ width: "100%", height: "500px" }}></div>
                    </div>
                </div> */}

                <div className="row mb-4">
                    <div className="col-12">
                        <h3 style={styles.subtitle}>Location</h3>
                        <h4 style={styles.location}>{location}</h4>
                        <div className="card p-1" style={{ ...styles.card, ...styles.hoverEffect }}>
                            <div
                                className="map-container"
                                style={{ position: "relative", height: "450px", width: "100%" }}
                            >
                                <div style={{ height: "100%", width: "100%" }}>
                                    <iframe
                                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyB9ehHDgZXPz2uOE6Tjfwiapo329zBVsKI&q=${encodeURIComponent(
                                            location
                                        )}`}
                                        width="100%"
                                        height="100%"
                                        allowFullScreen=""
                                        loading="lazy"
                                        title="Google Maps"
                                        style={{ border: 0, borderRadius: "10px" }}
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-12">
                        <h3 style={styles.subtitle}>Bedrooms</h3>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" style={styles.tableHeader}>
                                            #
                                        </th>
                                        <th scope="col" style={styles.tableHeader}>
                                            Type
                                        </th>
                                        <th scope="col" style={styles.tableHeader}>
                                            Price
                                        </th>
                                        <th scope="col" style={styles.tableHeader}>
                                            Availability
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.map((room, index) => (
                                        <tr key={index}>
                                            <th scope="row" style={styles.text}>
                                                {index + 1}
                                            </th>
                                            <td style={styles.text}>{room.room_type}</td>
                                            <td style={styles.text}>Rs {room.price}</td>
                                            <td style={styles.text}>
                                                {room.availability ? "Available" : "Not Available"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Link to={`/roomBooking/${id}`}>
                                <button className="btn text-white" style={{ ...styles.button, ...styles.hoverEffect }}>
                                    Book Now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function bufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; len > i; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

const styles = {
    title: {
        fontFamily: "Arial, sans-serif",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#e27125",
        borderBottom: "2px solid #e27125",
        paddingBottom: "5px",
        transition: "color 0.3s",
        background: "linear-gradient(90deg, rgba(226,113,37,1) 0%, rgba(255,175,75,1) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
    },
    subtitle: {
        fontFamily: "Arial, sans-serif",
        fontSize: "20px",
        fontWeight: "bold",
        color: "#e27125",
        borderBottom: "1px solid #bdc3c7",
        paddingBottom: "5px",
        marginBottom: "15px",
        transition: "color 0.3s",
        background: "linear-gradient(90deg, rgba(226,113,37,1) 0%, rgba(255,175,75,1) 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
    },
    label: {
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        fontWeight: "bold",
        color: "black",
    },
    text: {
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        color: "#2c3e50",
    },
    card: {
        borderRadius: "15px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(10px)",
        padding: "20px",
        marginBottom: "20px",
        transition: "transform 0.3s, box-shadow 0.3s",
    },
    hoverEffect: {
        '&:hover': {
            transform: "translateY(-10px)",
            boxShadow: "0 16px 32px rgba(0, 0, 0, 0.2)",
        }
    },
    list: {
        listStyleType: "none",
        paddingLeft: 0,
    },
    tableHeader: {
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#e27125",
        borderBottom: "2px solid #e27125",
    },
    select: {
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        color: "#2c3e50",
    },
    location: {
        fontFamily: "Helvetica, sans-serif",
        fontSize: "18px",
        fontWeight: "300",
        color: "#2c3e50",
    },
    carousel: {
        height: "400px",
        marginBottom: "30px",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s",
    },
    carouselImage: {
        height: "100%",
        objectFit: "cover",
        borderRadius: "10px",
    },
    panorama: {
        width: "100%",
        height: "500px",
        borderRadius: "10px",
    },
    amenitiesContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
    },
    amenityItem: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "5px 10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        transition: "transform 0.3s, box-shadow 0.3s",
    },
    amenityItemHover: {
        transform: "translateY(-5px)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    },
    amenityText: {
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        color: "#2c3e50",
    },
    roomsContainer: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "10px",
    },
    roomItem: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        textAlign: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        marginBottom: "10px",
        backdropFilter: "blur(10px)",
        transition: "transform 0.3s, box-shadow 0.3s",
    },
    roomItemHover: {
        transform: "translateY(-5px)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
    },
    roomType: {
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#2c3e50",
    },
    roomPrice: {
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        color: "#7f8c8d",
    },
    roomAvailability: {
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
        color: room => (room.availability ? "green" : "red"),
    },
    button: {
        backgroundColor: "#e27125",
        borderColor: "#e27125",
        transition: "background-color 0.3s, border-color 0.3s",
        '&:hover': {
            backgroundColor: "#c65a20",
            borderColor: "#c65a20",
        }
    },
    icon: {
        color: "#e27125",
        transition: "color 0.3s",
        '&:hover': {
            color: "#c65a20",
        }
    },
};

export default HostelDetail;
