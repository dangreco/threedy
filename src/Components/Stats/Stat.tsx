import React from "react";
import styles from "./styles";


type StatProps = {
    name: string,
    value: string
}

const Stat: React.FC<StatProps> = ({ name, value }) => {

    return (
        <div style={{ ...styles.Stat }}>
            <p style={{ ...styles.StatText, ...styles.Condition }}>
                { name }
            </p>
            <p style={{ ...styles.StatText }}>
                { value }
            </p>
        </div>
    )

};

export default Stat;
