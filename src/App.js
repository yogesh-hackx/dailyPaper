import React from "react";
import NavButtons from "./components/NavButtons";

class App extends React.Component {
    state = {
        currPage: "01",
        totalPages: null,
        day: "24",
        month: "05",
        loading: true,
    };

    pageChangeHandler = (inc) => {
        let pageInt = parseInt(this.state.currPage);
        pageInt += inc;
        if (pageInt <= this.state.totalPages && pageInt >= 1) {
            this.setState({ loading: true });
            let strPageNo = pageInt.toString();

            if (strPageNo.length === 1) strPageNo = 0 + strPageNo;

            this.setState({ currPage: strPageNo });
        }
    };

    getElementByXpath = (path, doc) => {
        return doc.evaluate(
            path,
            doc,
            null,
            XPathResult.ANY_UNORDERED_NODE_TYPE,
            null
        );
    };

    async componentDidMount() {
        let date = new Date();
        this.setState({
            day: date.getDate(),
            month: "0" + (date.getMonth() + 1),
        });
        let res = await fetch(
            `https://epaper.amarujala.com/almora/2020${this.state.month}${this.state.day}/01.html?ed_code=almora`
        );
        let resStr = await res.text();
        let parser = new DOMParser();
        let doc = parser.parseFromString(resStr, "text/html");
        console.log(doc.getElementById("edition_total_page"));
        console.log(doc.textContent);
        let scriptString = this.getElementByXpath("/html/body/script[14]", doc)
            .singleNodeValue.innerHTML;
        let totalIndex = scriptString.indexOf("totalPage");
        let totalPageNo = parseInt(
            scriptString.slice(totalIndex + 13, totalIndex + 15)
        );
        this.setState({
            totalPages: totalPageNo,
        });
        console.log(scriptString.slice(totalIndex, totalIndex + 17));
    }

    render() {
        return (
            <div>
                <div className="content">
                    <NavButtons
                        change={this.pageChangeHandler}
                        loading={this.state.loading}
                    />
                    <img
                        ref={this.scrollRef}
                        src={`https://epaperwmimg.amarujala.com/2020/${this.state.month}/${this.state.day}/al/${this.state.currPage}/hdimage.jpg`}
                        alt=""
                        onLoad={() => this.setState({ loading: false })}
                    />
                    <NavButtons
                        change={this.pageChangeHandler}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        );
    }
}

export default App;
