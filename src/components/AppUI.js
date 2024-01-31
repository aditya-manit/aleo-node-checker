import React from "react";
import {Header} from "./Header";
import {Field} from "./Field";
import {ResultBox} from "./ResultBox";
import {getColor} from "../helper/getColor";

export function ReturnApp(props) {
    const {load, config} = props;

    return (
        <body>
        <section className="section" style={{textAlign: "center"}}>
            <div className="container" style={{textAlign: "center"}}>
                <div className="columns">
                    <div className="column is-three-quarters">
                        <Header title={config.appTitle}/>
                        <br/>
                        <div className="card">
                            <div className="card-content">
                                <form id="form">
                                    {config.fields.map((field, index) => (
                                        <Field
                                            key={index}
                                            label={field.label}
                                            id={`field-${index}`}
                                            type={field.type}
                                            icon={field.icon}
                                            hoverText={field.hoverText}
                                        />
                                    ))}
                                    <div id="my-button" className="control">
                                        <button
                                            id="button"
                                            className="button is-large is-fullwidth is-primary is-outlined"
                                            type={"button"}
                                            {...(load ? {onClick: load} : {})}
                                        ></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="section">
            <h1 className="title ">{config.resultRowTitle}</h1>
            <div className="columns is-multiline">
                {config.resultBoxes.map((box, index) => (
                    <ResultBox
                        key={index}
                        id={`resultBox-${index}`}
                        suffix={box.suffix}
                        text={box.text}
                        color={getColor()}
                        large={index >= 2} // Pass 'large' prop as true for the first two boxes
                    />
                ))}
            </div>
        </section>
        </body>
    );
}
