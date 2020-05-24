import React from "react";
import NavButtons from "./components/NavButtons";

class App extends React.Component {
    state = {
        currPage: "01",
        day: "23",
        month: "05",
        loading: true,
    };

    pageChangeHandler = (inc) => {
        this.setState({ loading: true });
        let pageInt = parseInt(this.state.currPage);
        pageInt += inc;
        let strPageNo = pageInt.toString();

        if (strPageNo.length === 1) strPageNo = 0 + strPageNo;
        this.setState({ currPage: strPageNo });
    };

    componentDidMount() {
        let date = new Date();
        this.setState({ day: date.getDate(), month: "0" + date.getMonth() });
    }

    render() {
        return (
            <div>
                <div className="content">
                <NavButtons change={this.pageChangeHandler} loading={this.state.loading} />
                    <img ref={this.scrollRef}
                        src={`https://epaperwmimg.amarujala.com/2020/${this.state.month}/${this.state.day}/al/${this.state.currPage}/hdimage.jpg`}
                        alt=""
                        onLoad={() => this.setState({ loading: false })}
                    />
                    <NavButtons change={this.pageChangeHandler} loading={this.state.loading} />
                </div>
            </div>
        );
    }
}

export default App;
