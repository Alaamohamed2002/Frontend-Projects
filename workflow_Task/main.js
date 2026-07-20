let title = document.querySelector( ".form .group input" );
let desc = document.querySelector( ".form .group textarea " );
let allChooeses = document.querySelectorAll( ".priority .prio " );
let startDate = document.querySelector( ".Date .startdate input" );
let endDate = document.querySelector( ".Date .enddate input" );
let taskContainer = document.querySelector( ".task-container .container" );
let overDue = document.querySelector( ".overdue-tasks .overdue" );
let overdueTasksNum = document.querySelector( " h2 .tasks-num" );
let today = new Date().toISOString().split( "T" )[ 0 ];
let todayContainer = document.querySelector( ".overdue-tasks" );
let overdueBtn = document.querySelector( ".overdue-tasks .see-more" );
let todatTasksContainer = document.querySelector( ".today-container" );
let todayBtn = document.querySelector( ".today-container .see-more" );
let todayTasks = document.querySelector( " .today-container .today-tasks" );
let content = document.querySelector( ".content" );
let priorityContainer = document.querySelector( ".priority-container" );
let highPriorityContainer = document.querySelector( " .high-priority .content-container" );
let mediumPriorityContainer = document.querySelector( ".medium-priority .content-container" );
let lowPriorityContainer = document.querySelector( ".low-priority .content-container " );
let highPriorityContainer1 = document.querySelector( " .high-priority " );
let mediumPriorityContainer2 = document.querySelector( ".medium-priority " );
let lowPriorityContainer3 = document.querySelector( ".low-priority " );
let highPriorityBtn = document.querySelector( ".high-priority .see-more" );
let mediumPriorityBtn = document.querySelector( ".medium-priority .see-more" );
let lowPriorityBtn = document.querySelector( ".low-priority .see-more" );
let totalTasks = document.querySelector( ".stat-card .today span" );
let completeTasks = document.querySelector( ".stat-card .complete span" );
let pendingTasks = document.querySelector( ".stat-card .pending span" );
let thisWeekTasks = document.querySelector( ".stat-card .week span" );
let statsCard = document.querySelector( ".stat-card" );
let statContainer = document.querySelector( ".stat-container" );



// console.log( highPriorityContainer );
// console.log( mediumPriorityContainer );
// console.log( lowPriorityContainer );
// console.log( highPriorityBtn );
// console.log( mediumPriorityBtn );
// console.log( lowPriorityBtn );

// console.log( todayTasks );
// console.log( overDue );

// if ( overdueTasksNum )
// {
//     console.log( overdueTasksNum );
// }







let selectedPriority = "medium";

let AddButton = document.querySelector( ".btn-add" );
// console.log( AddButton );


allChooeses.forEach( ( e ) =>
{
    e.addEventListener( "click", ( e ) =>
    {
        allChooeses.forEach( btn => btn.classList.remove( "active" ) );
        let clickBtn = e.currentTarget;
        selectedPriority = ( e.currentTarget.firstElementChild.innerHTML ).toLowerCase();
        clickBtn.classList.add( 'active', selectedPriority );
        // console.log(selectedPriority  );
        // console.log( e.currentTarget.firstElementChild );
        // console.log( e.currentTarget.children[ 0 ] );


    } );
} );

let arrayOfTasks = [];

if ( localStorage.getItem( "tasks" ) )
{
    arrayOfTasks = JSON.parse( localStorage.getItem( "tasks" ) );
}


getDataFromLocalStorage();


if ( AddButton )
{
    AddButton.addEventListener( "click", () =>
    {
        if ( title.value !== "" && desc.value !== "" && startDate.value !== "" && endDate.value !== "" )
        {
            addTaskToArray( title.value );
            title.value = "";
            desc.value = "";
            startDate.value = "";
            endDate.value = "";
            allChooeses.forEach( btn => btn.classList.remove( "active" ) );
            selectedPriority = "medium";

        }


    } );
}


function addTaskToArray ( taskText )
{

    // console.log( title.value );
    // console.log( desc.value );

    // console.log( startDate.value );
    // console.log( endDate.value );

    let days = new Date( endDate.value ) - new Date( today );
    // console.log( Math.floor( days / 1000 / 60 / 60 / 24 ) );

    let tasks = {
        id: Date.now(),
        title: title.value.trim(),
        desc: desc.value.trim(),
        startDate: startDate.value,
        endDate: endDate.value,
        days: Math.abs( Math.ceil( days / ( 1000 * 60 * 60 * 24 ) ) ),
        priority: selectedPriority,
        complete: false,
    };

    arrayOfTasks.push( tasks );
    console.log( arrayOfTasks );
    addDataToLocalStorageFrom( arrayOfTasks );
    getDataFromLocalStorage();
    // addElementToPageFrom( arrayOfTasks );
}
function addDataToLocalStorageFrom ( arryofTasks )
{

    localStorage.setItem( "tasks", JSON.stringify( arryofTasks ) );
}

if ( taskContainer )
{
    taskContainer.addEventListener( "click", ( e ) =>
    {
        if ( e.target.classList.contains( "delete" ) )
        {
            let taskCard = e.target.closest( ".task-card" );
            let taskId = taskCard.dataset.id;
            deleteTaskWith( taskId );

            taskCard.remove();
        }
    } );
}
function getDaysLeft ( endDateStr )
{
    if ( !endDateStr ) return 0;
    let today = new Date();
    today.setHours( 0, 0, 0, 0 );

    let parts = endDateStr.split( "-" );
    let year = parseInt( parts[ 0 ] );
    let month = parseInt( parts[ 1 ] ) - 1;
    let day = parseInt( parts[ 2 ] );
    let end = new Date( year, month, day );
    end.setHours( 0, 0, 0, 0 );

    let diffTime = end - today;
    return Math.floor( diffTime / ( 1000 * 60 * 60 * 24 ) );
}

function addElementToPageFrom ( arrayOfTasks, container )
{
    container.innerHTML = "";
    arrayOfTasks.forEach( task =>
    {
        // let today = new Date().toISOString().split( "T" )[ 0 ];
        // let diffTime =  new Date( task.endDate ) - new Date( today ) ;
        let diffDay = getDaysLeft( task.endDate );
        let div = document.createElement( "div" );
        div.className = `task-card  ${ task.priority }`;
        div.setAttribute( "data-id", task.id );

        let title = document.createElement( "h3" );
        title.className = "title";
        title.innerHTML = task.title;
        div.appendChild( title );

        let desc = document.createElement( "p" );
        desc.className = "desc";
        desc.innerHTML = task.desc;
        div.appendChild( desc );

        let taskMeta = document.createElement( "div" );
        taskMeta.className = "task-meta";
        let spanPriority = document.createElement( "span" );
        spanPriority.className = `task-priroity-${ task.priority }`;
        spanPriority.innerHTML = ( task.priority );
        taskMeta.appendChild( spanPriority );
        let span = document.createElement( "span" );
        span.className = `days`;
        if ( diffDay > 0 )
        {
            span.innerHTML = `${ diffDay } day${ diffDay > 1 ? "s" : "" } Left`;
        }
        else if ( diffDay === 0 )
        {
            span.innerHTML = `Due Today`;
        }
        else if ( diffDay < 0 )
        {
            span.innerHTML = `Was Due:${ Math.abs( diffDay ) } day${ Math.abs( diffDay ) > 1 ? "s" : "" } ago`;
        }
        taskMeta.appendChild( span );
        div.appendChild( taskMeta );

        let btn = document.createElement( "div" );
        btn.className = "btns";

        let spanComplete = document.createElement( "span" );
        spanComplete.className = "complete";
        spanComplete.innerHTML = "Complete";
        btn.appendChild( spanComplete );

        let spanDelete = document.createElement( "span" );
        spanDelete.className = "delete";
        spanDelete.innerHTML = "Delete";
        btn.appendChild( spanDelete );

        div.appendChild( btn );

        container.appendChild( div );

        spanComplete.addEventListener( "click", ( e ) =>
        {
            task.complete = true;
            addDataToLocalStorageFrom( arrayOfTasks );
            div.classList.add( "completeTask" );
        } );


        if ( task.complete === true )
        {
            div.className = `task-card  ${ task.priority } completeTask`;
        }


    } );
}
function getDataFromLocalStorage ()
{
    let seeAllBtn = document.querySelector( ".see-all-btn" );
    let data = localStorage.getItem( "tasks" );
    if ( data )
    {
        let tasks = JSON.parse( data ) || [];
        let lastThreeTasks = tasks.slice( -3 ).reverse();
        if ( taskContainer )
        {
            addElementToPageFrom( lastThreeTasks, taskContainer );
        }
        let allTasks = document.querySelector( ".task-container  .cont" );
        // console.log( allTasks );
        // console.log( tasks );
        if ( allTasks )
        {
            addElementToPageFrom( tasks, allTasks );
        }

        if ( taskContainer )
        {
            if ( tasks.length === 0 )
            {
                seeAllBtn.remove();
                taskContainer.innerHTML = `<p class = "text">No Tasks Yet</p>`;
                if ( seeAllBtn )
                {

                }

            }
        }
        dueToday( arrayOfTasks );
        priorityTasks( arrayOfTasks );

    }
}
function deleteTaskWith ( id ) 
{
    arrayOfTasks = arrayOfTasks.filter( ( task ) => task.id != id );
    addDataToLocalStorageFrom( arrayOfTasks );
    updateTaskCount();

}
function dueToday ( tasks )
{
    if ( todayContainer )
    {

        let tasksNum = document.querySelector( ".head p .task-num" );
        let tasksDate = document.querySelector( ".head p .date" );


        let today = new Date().toISOString().split( "T" )[ 0 ];
        let taskNumArr = [];
        let overdueArr = [];
        for ( let i = 0; i < tasks.length; i++ )
        {
            let taskDate = tasks[ i ].endDate;
            // console.log( tasks[ i ].endDate );
            if ( taskDate === today && tasks[ i ].complete === false )
            {
                // console.log( tasks[ i ].title );
                todatTasksContainer.classList.add( "block" );
                taskNumArr.push( tasks[ i ] );

            }
            else if ( taskDate < today && tasks[ i ].complete === false )
            {
                todayContainer.classList.add( "block" );
                overdueArr.push( tasks[ i ] );

                console.log( `This From Overdue Array => ${ overdueArr }` );
                console.log( `This Length For Overdue Array => ${ overdueArr.length }` );
                console.log( overdueTasksNum );
                if ( overdueArr.length > 0 )
                {
                    overdueTasksNum.innerHTML = overdueArr.length;
                }
                else
                {
                    todayContainer.classList.remove( "block" );
                }
            }
        }

        renderAllTasks( overdueArr, overDue );
        seeMore( overdueArr, overDue, overdueBtn );

        tasksNum.innerHTML = taskNumArr.length;
        let todayNow = new Date();
        let options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        // console.log( tasksDate );
        let formattedDate = todayNow.toLocaleDateString( "en-US", options );

        tasksDate.innerHTML = formattedDate;
        console.log( taskNumArr );

        renderAllTasks( taskNumArr, todayTasks );
        seeMore( taskNumArr, todayTasks, todayBtn );
    }
}
if ( content )
{
    content.addEventListener( "click", e =>
    {
        if ( e.target.classList.contains( "delete" ) )
        {
            let taskCard = e.target.closest( ".card" );
            let taskId = taskCard.dataset.id;
            deleteTaskWith( taskId );

            taskCard.remove();

            dueToday( arrayOfTasks );

        }
    } );
}
if ( priorityContainer )
{
    priorityContainer.addEventListener( "click", e =>
    {
        if ( e.target.classList.contains( "delete" ) )
        {
            let taskCard = e.target.closest( ".card" );
            let taskId = taskCard.dataset.id;
            deleteTaskWith( taskId );

            taskCard.remove();

            dueToday( arrayOfTasks );

        }
    } );
}


function renderAllTasks ( arr, container )
{

    if ( !container )
    {
        console.error( "empty Container", arr );
        return;
    }

    if ( container )
    {
        container.innerHTML = "";
    }



    for ( let i = 0; i < arr.length; i++ )
    {
        let card = document.createElement( "div" );
        card.className = "card";
        card.setAttribute( "data-id", arr[ i ].id );
        let control = document.createElement( "div" );
        control.className = "control";
        let input = document.createElement( "input" );
        input.type = "checkbox";
        input.name = "complete";
        input.id = `${ arr[ i ].id }`;
        control.appendChild( input );
        let label = document.createElement( "label" );
        label.setAttribute( "for", `${ arr[ i ].id }` );
        label.innerHTML = arr[ i ].title;
        control.appendChild( label );

        let due = document.createElement( "div" );
        due.className = "due";
        let p = document.createElement( "p" );
        let diffTime = new Date( arr[ i ].endDate ) - new Date( today );
        let diffDay = Math.ceil( ( diffTime / ( 1000 * 60 * 60 * 24 ) ) );

        if ( diffDay > 0 )
        {
            p.innerHTML = `${ diffDay } day${ diffDay > 1 ? "s" : "" } Left`;
        }
        else if ( diffDay === 0 )
        {
            p.innerHTML = `Due Today`;
        }
        else if ( diffDay < 0 )
        {
            p.innerHTML = `Was Due  <span class="date"> ${ Math.abs( diffDay ) }</span>  day${ Math.abs( diffDay ) > 1 ? "s" : "" } ago`;
        }

        due.appendChild( p );

        let btns = document.createElement( "div" );
        btns.className = "btns";
        let completeBtnSpan = document.createElement( "span" );
        completeBtnSpan.className = "complete";
        completeBtnSpan.innerHTML = "Complete";
        btns.appendChild( completeBtnSpan );
        let deleteBtnSpan = document.createElement( "span" );
        deleteBtnSpan.className = "delete";
        deleteBtnSpan.innerHTML = "Delete";
        btns.appendChild( deleteBtnSpan );

        completeBtnSpan.addEventListener( "click", () =>
        {
            arr[ i ].complete = true;
            addDataToLocalStorageFrom( arrayOfTasks );
            if ( arr[ i ].complete === true )
            {
                card.classList.add( "completeTask" );
            }
        } );

        input.addEventListener( "change", () =>
        {
            arr[ i ].complete = input.checked;;
            addDataToLocalStorageFrom( arrayOfTasks );
            if ( arr[ i ].complete === true )
            {
                card.classList.add( "completeTask" );
            } else
            {
                card.classList.remove( "completeTask" );
            }
        } );

        card.appendChild( control );
        card.appendChild( due );
        card.appendChild( btns );
        container.appendChild( card );


    }


}
function seeMore ( taskArr, container, button )
{
    if ( taskArr.length > 3 )
    {

        button.textContent = `Show  ${ taskArr.length - 3 } More Task${ taskArr.length - 3 > 1 ? "s" : "" }`;

        let lastThreeOverdueTasks = taskArr.slice( -3 ).reverse();
        renderAllTasks( lastThreeOverdueTasks, container );
        let isExpand = false;

        button.addEventListener( "click", () =>
        {
            isExpand = !isExpand;
            if ( isExpand )
            {
                renderAllTasks( taskArr, container );
                button.textContent = 'See Less';
            } else
            {
                renderAllTasks( lastThreeOverdueTasks, container );
                button.textContent = `Show  ${ taskArr.length - 3 } More Task${ taskArr.length - 3 > 1 ? "s" : "" }`;
            }



        } );

    } else if ( taskArr.length <= 3 )
    {
        renderAllTasks( taskArr, container );
        button.style.display = "none";
        return;
    }
}
function updateTaskCount ()
{
    if ( content )
    {
        let todayTask = arrayOfTasks.filter( task => task.endDate === today && task.complete === false );
        let overdueTask = arrayOfTasks.filter( task => task.endDate < today && task.complete === false );
        let futuretask = arrayOfTasks.filter( task => task.endDate > today && task.complete === false );
        overdueTasksNum.innerHTML = overdueTask.length;
        if ( content )
        {
            document.querySelector( ".head p .task-num " ).innerHTML = todayTask.length;
        }


        if ( overdueTask.length === 0 )
        {
            todayContainer.classList.remove( "block" );
            overDue.innerHTML = "";
        } else
        {
            todayContainer.classList.add( "block" );
        }
    }

    if ( priorityContainer )
    {
        let highPriority = arrayOfTasks.filter( task => task.priority === "high" && task.complete === false );
        let mediumPriority = arrayOfTasks.filter( task => task.priority === "medium" && task.complete === false );
        let lowPriority = arrayOfTasks.filter( task => task.priority === "low" && task.complete === false );


        if ( highPriority.length > 0 )
        {

            let h2 = document.createElement( "h2" );
            h2.innerHTML = `<span class="tasks-num"></span> Tasks`;
            highPriorityContainer1.appendChild( h2 );
            highPriorityContainer1.querySelector( "h2 .tasks-num" ).innerHTML = highPriority.length;
        }
        if ( mediumPriority.length > 0 )
        {
            let h2 = document.createElement( "h2" );
            h2.innerHTML = `<span class="tasks-num"></span> Tasks`;
            mediumPriorityContainer2.appendChild( h2 );
            mediumPriorityContainer2.querySelector( "h2 .tasks-num" ).innerHTML = mediumPriority.length;
        }
        if ( lowPriority.length > 0 )
        {
            let h2 = document.createElement( "h2" );
            h2.innerHTML = `<span class="tasks-num"></span> Tasks`;
            lowPriorityContainer3.appendChild( h2 );
            lowPriorityContainer3.querySelector( "h2 .tasks-num" ).innerHTML = lowPriority.length;
        }



        highPriority.length === 0 ? highPriorityContainer1.classList.remove( "block" ) : highPriorityContainer1.classList.add( "block" );
        mediumPriority.length === 0 ? mediumPriorityContainer2.classList.remove( "block" ) : mediumPriorityContainer2.classList.add( "block" );
        lowPriority.length === 0 ? lowPriorityContainer3.classList.remove( "block" ) : lowPriorityContainer3.classList.add( "block" );
    }
}

function priorityTasks ( tasks )
{
    highPriorityArr = [];
    mediumPriorityArr = [];
    lowPriorityArr = [];

    if ( priorityContainer )
    {
        tasks.forEach( task =>
        {
            if ( task.priority === "high" && task.complete === false )
            {
                highPriorityContainer1.classList.add( "block" );
                highPriorityArr.push( task );
            }
            else if ( task.priority === "medium" && task.complete === false )
            {
                mediumPriorityContainer2.classList.add( "block" );
                mediumPriorityArr.push( task );
            }
            else if ( task.priority === "low" && task.complete === false )
            {
                lowPriorityContainer3.classList.add( "block" );
                lowPriorityArr.push( task );
            }



        } );


        if ( highPriorityArr.length > 0 )
        {

            highPriorityContainer1.querySelector( "h2 .tasks-num" ).innerHTML = highPriorityArr.length;
        }
        if ( mediumPriorityArr.length > 0 )
        {
            mediumPriorityContainer2.querySelector( "h2 .tasks-num" ).innerHTML = mediumPriorityArr.length;
        }
        if ( lowPriorityArr.length > 0 )
        {
            lowPriorityContainer3.querySelector( "h2 .tasks-num" ).innerHTML = lowPriorityArr.length;
        }



        renderAllTasks( highPriorityArr, highPriorityContainer );
        renderAllTasks( mediumPriorityArr, mediumPriorityContainer );
        renderAllTasks( lowPriorityArr, lowPriorityContainer );

        seeMore( highPriorityArr, highPriorityContainer, highPriorityBtn );
        seeMore( mediumPriorityArr, mediumPriorityContainer, mediumPriorityBtn );
        seeMore( lowPriorityArr, lowPriorityContainer, lowPriorityBtn );

    }
}

let lis = document.querySelectorAll( ".fillter nav ul li" );
let allTasks = Array.from( document.querySelectorAll( " .all" ) );

console.log( allTasks );

lis.forEach( li =>
{
    li.addEventListener( "click", function ()
    {
        lis.forEach( ( li ) =>
        {
            li.classList.remove( "active" );
            this.classList.add( "active" );
        } );
    } );

    li.addEventListener( "click", function ()
    {
        allTasks.forEach( task =>
        {
            task.style.display = 'none';
        } );
        console.log( document.querySelectorAll( this.dataset.priority ) );
        document.querySelectorAll( this.dataset.priority ).forEach( ( el ) =>
        {
            el.style.display = "block";
        } );
    } );
} );

function clearTasks ()
{
    setTimeout( () =>
    {
        arrayOfTasks = arrayOfTasks.filter( task => task.complete !== true );
        addDataToLocalStorageFrom( arrayOfTasks );
    }, 2000 );
}

window.onload = function ()
{
    clearTasks();
    dueToday( arrayOfTasks );
    getDataFromLocalStorage();
};


let dataManagement = document.querySelector( ".data-management-container" );
let conformDelete = document.querySelector( ".conformDelete" );
let overlay = document.querySelector( ".data-container " );
let downloadDtn = document.querySelector( ".flex button.download-btn" );
let cancelBtn = document.querySelector( ".conformDelete .box .buttons .cancel" );
let clearBtn = document.querySelector( ".flex button.clear-btn" ); // to show
let clearTasksBtn = document.querySelector( ".conformDelete .box .buttons .clear-btn" ); // to dalete

if ( dataManagement )
{
    console.log( overlay );
    function downloadfile ( content, fileName, fileType )
    {
        let blob = new Blob( [ content ], { type: fileType } );
        let url = URL.createObjectURL( blob );
        let link = document.createElement( "a" );
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL( url );
    }

    downloadDtn.addEventListener( "click", () =>
    {
        if ( arrayOfTasks.length === 0 )
        {
            alert( "No Tasks To Download." );
            return;
        }
        let taskTitle = arrayOfTasks.map( task => task.title );
        let content = "My Tasks List\n" + "===============\n\n" + taskTitle.join( "\n" );
        downloadfile( content, "tasks.txt", "taskFlow/plain" );
    } );

    clearBtn.addEventListener( "click", () =>
    {
        conformDelete.classList.add( "show" );
        overlay.classList.add( "show" );
    } );

    cancelBtn.addEventListener( "click", () =>
    {
        conformDelete.classList.remove( "show" );
        overlay.classList.remove( "show" );
    } );

    clearTasksBtn.addEventListener( "click", () =>
    {
        clearAll( arrayOfTasks );
    } );

    function clearAll ( arrayOfTasks )
    {
        arrayOfTasks = [];
        localStorage.removeItem( "tasks" );
        dueToday( arrayOfTasks );
        getDataFromLocalStorage();
        conformDelete.classList.remove( "show" );
        overlay.classList.remove( "show" );
    }

}
function getThisWeekTasks ()
{
    let today = new Date();

    let firstDay = new Date( today );
    firstDay.setDate( today.getDate() - ( today.getDay() - 1 ) );
    firstDay.setHours( 0, 0, 0, 0 );

    let lastDay = new Date( firstDay );
    lastDay.setDate( firstDay.getDate() + 6 );
    lastDay.setHours( 23, 59, 59, 999 );

    let tasksThisWeek = arrayOfTasks.filter( task =>
    {
        let taskDate = new Date( task.startDate );
        return taskDate >= firstDay && taskDate <= lastDay;
    } );
    return tasksThisWeek.length;
}

if ( statContainer )
{
    document.querySelector( ".week .number" ).innerHTML = getThisWeekTasks();
    completeTasks.innerHTML = arrayOfTasks.filter( task => task.priority === "high" ).length;
    totalTasks.innerHTML = arrayOfTasks.length;
    pendingTasks.innerHTML = arrayOfTasks.length;
}



