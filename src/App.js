import React from "react";
import NavButtons from "./components/NavButtons";
import {imageExists} from './utils/checkImageExists'

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
            console.log(strPageNo);

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
        let day = date.getDate();
        day = day.toString();
        day = day.length === 1 ? 0 + day : day;
        let month = (date.getMonth()+1).toString()
        month = month.length === 1 ? 0 + month : month;

        this.setState({
            day,
            month,
        });
        let res = await fetch(
            `https://epaper.amarujala.com/almora/2020${this.state.month}${this.state.day}/01.html?ed_code=almora`
        );

        await this.checkNoOfPages()

    }


    checkNoOfPages = async () => {
        for(let i=1; i<25; i++) {
            try {
                let exists = await imageExists(`https://epaperwmimg.amarujala.com/2020/${this.validPageNoInStr(this.state.month)}/${this.validPageNoInStr(this.state.day)}/al/${this.validPageNoInStr(i)}/hdimage.jpg`)
                if (!exists)
                    break;
                this.setState({
                    totalPages: i
                })
                
            } catch (error) {
                break;
                
            }

        }

    }

    validPageNoInStr = (pageNo) => {
        let strPageNo = pageNo.toString()
        if (strPageNo.length === 1) strPageNo = 0 + strPageNo;
        return strPageNo
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
