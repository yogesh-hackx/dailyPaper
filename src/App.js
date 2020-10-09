import React from "react";
import NavButtons from "./components/NavButtons";
import {imageExists} from './utils/checkImageExists'

class App extends React.Component {
    state = {
        currPage: "01",
        totalPages: 10,
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
        }, () => {
            this.checkNoOfPages()
        });


    }


    checkNoOfPages = async () => {
        // assuming the page range b/w 10-20 
        for(let i=10; i<20; i++) {
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
                    <div className="paper-image">
                        <img
                            ref={this.scrollRef}
                            src={`https://epaperwmimg.amarujala.com/2020/${this.state.month}/${this.state.day}/al/${this.state.currPage}/hdimage.jpg`}
                            alt="newsimage"
                            style="width:50%"
                            onLoad={() => this.setState({ loading: false })}
                        />
                    </div>
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
