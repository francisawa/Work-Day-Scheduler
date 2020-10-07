$(document).ready(function(){
    var arr = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]
    function createTimeBlocks() {
        for (var i =0; i< 8; i++){
            var timeBlock = $("<div>")
            timeBlock.addClass("row timeBlock")
            timeBlock.attr("id", arr[i])

            var hour = $("<div>")
            hour.addClass("col-md-1 hour")
            hour.text(arr[i])

            var textarea = $("<textarea>")
            textarea.addClass("col-md-10 text")

            var btn = $("<button>")
            btn.addClass("col-md-1 btn saveBtn")

            var icon = $("<i>")
            icon.addClass("fa fa-save")

            btn.append(icon)

            timeBlock.append(hour)
            timeBlock.append(textarea)
            timeBlock.append(btn)

            var container = $(".container")
            container.append(timeBlock)
        }
    }
    createTimeBlocks()

    function convertTime(time){
        var numTime = time.substring(0, (time.indexOf("M") - 1))
        numTime = parseInt(numTime)
        if(numTime < 6){
            numTime = numTime + 12
        }
        return numTime
    }

    function timeUpdate(){
        var currentTime = moment().hours()

        $(".timeBlock").each(function(){
            var blockTime = $(this).attr("id")
            blockTime = convertTime(blockTime)

            if(blockTime < currentTime){
                $(this).addClass("past")
            } else if (blockTime === currentTime){
                $(this).removeClass("past")
                $(this).addClass("present")
            } else {
                $(this).removeClass("past")
                $(this).removeClass("present")
                $(this).addClass("future")
            }
        })
    }
    timeUpdate()

    $(".saveBtn").on("click", function(){
        var text = $(this).siblings(".text").val()
        var time = $(this).siblings(".hour").text()

        localStorage.setItem(time, JSON.stringify(text))
    })

    // $(".timeBlock").each(function(){
    //     $(`#${this.attr("id")} .text`).val(JSON.parse(localStorage.getItem(`${this.attr("id")}`)))
    // })
    
    $("#9AM .text").val(JSON.parse(localStorage.getItem("9AM")))


})