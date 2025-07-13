import Header from "../components/Header";

export default function FamilyTree() {
    return (
        <>
            <Header />
            <iframe
                src="/html/main-treee.html"
                title="Embedded HTML"
                style={{
                    width: "100%",
                    height: "700px",
                    border: "none",
                    marginTop: "20px",
                }}
            />
        </>
    );
}
