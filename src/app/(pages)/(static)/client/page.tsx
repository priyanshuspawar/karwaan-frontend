"use client";
import { clientData } from "@/constants/ClientsData";
import React, { useEffect } from "react";
import styles from "./style.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/component/footer/Footer";
export default function Client() {
  useEffect(() => {
    // Call the handleGetAllProduct function when the component mounts or when dependencies change
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <div style={{position:"relative"}}>
      <div style={{ position: "relative" }}>
        <div className={styles.clientPage}>
          <h3
          className={styles.pageHeading}
      
          >
            Our Clients
          </h3>
          <div className={styles.clients}>
            {clientData.map((data) => {
              return (
                <div
                  data-aos="fade-up"
                  className={styles.oneCard}
                  key={data.id}
                >
                  <div className={styles.blogCardImg}>
                    <img
                      className={styles.companyLogo}
                      src={data.imgSrc}
                      alt={"image" + data.id}
                    />
                  </div>
                  <div className={styles.companyName}>{data.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
 
    </div>
  );
}
