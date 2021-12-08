app.controller("leaderboardCtrl", function($scope, $http) {
    
    var lastUpdated = new Date();

    $scope.teamListTimeRange = "-1";

    $scope.displayTeam = (team, range) => {
        let url = `/api/teams/${team.id}/badges`;
        if(range!=="-1") url+=`?days=${range}`;

        $http.get(url,window.getAjaxOpts())
        .then(function(response) {
            if(response !== null && response.data !== null){
                let teamMembers = response.data;
                let lbModules = $scope.lbModules;
                for(let moduleId in lbModules){
                    lbModules[moduleId].members = [];
                }
                
                for(let user of teamMembers){
                    if(user.moduleId===null){
                        continue;
                    }
                    for(let moduleId in lbModules){
                        if(moduleId===user.moduleId){
                            lbModules[moduleId].members.push(user);
                        }
                    }
                }
                //calculate percentage of completion
                for(let moduleId in lbModules){
                    let m = lbModules[moduleId];
                    if(team.playerCount > 0){
                        m.percentageCompleted = Math.round(m.members.length/team.playerCount*100);
                    }
                }

                $scope.lbModules = lbModules;
            }
        });

        let toto = `/api/team/challenges`;

        $http.get(toto,window.getAjaxOpts())
        .then(function(response) {
            console.log(response);
        });
        
    }

    $scope.onTeamChange = function() {
        if($scope.teamStatList!==null){
            let selection = $scope.teamStatList[$scope.teamListChoice];
            let range = $scope.teamListTimeRange;
            if(typeof selection !== "undefined"){
                $scope.displayTeam(selection, range);
            }
        }
    }

    $scope.init = function(){
        $scope.teamStatList = null;
        $http.get("/api/teamStats",window.getAjaxOpts())
        .then(function(response) {
            if(response !== null && response.data !== null){
                $scope.teamStatList = response.data;
                //preselect current user's team
                for(let index = 0; index < $scope.teamStatList.length; index++){
                    let team = $scope.teamStatList[index];
                    if(team.id === $scope.user.teamId){
                        $scope.teamListChoice = index+"";
                        $scope.onTeamChange();
                        break;
                    }
                }
            }
        });
        
        $http.get("/api/team/scores",window.getAjaxOpts())
            .then(function(o) {
                $scope.users = o.data;
                //let highscore = o.date[0].score;
                //$scope.
                $scope.highScore = o.data[0].score;
            });
    }

    function poll() {
        if(!windowIsActive) { //If Window/Tab is currently not in focus, wait to do the magic
            console.log ( 'Window not active. Waiting' );
            $("#badData").html('<center>Scoreboard last updated ' + timeSince(lastUpdated) + ' ago</center>');
            $("#badData").show("slow");
            t=setTimeout("poll()", 500); // try again really soon
        }
        else { // Window is Active. Do Magic
            console.log ( 'Window Active. Refreshing' );
            

                /*$("#badData").hide("fast");
                for(i=0;i<o.length;i++) {
                    if ($('#userbar-'+ o[i].id).length == 0) {
                        // this id doesn't exist, so add it to our list.
                        var newUser = '<li class="scoreLine"><div id="userbar-'+ o[i].id + '" class="scoreBar" title="' + o[i].userTitle + '" style="width: ' + o[i].scale + '\u0025;">' +
                                '<div id="userplace-'+ o[i].id + '" class="place"><h3 style="display:none;" id="user-' + o[i].id + '">' + o[i].order + '</h3>' + getGetOrdinal(o[i].place) + ': </div>'
                                + '<div class="scoreName" >'+ o[i].username
                                    + '<div id="goldMedals-' + o[i].id + '" class="medalContainer"><div style="' + o[i].goldDisplay + '"><div class="goldMedalAmountBubble">' + o[i].goldMedalCount + '</div></div></div>'
                                    + '<div id="silverMedals-' + o[i].id + '" class="medalContainer"><div style="' + o[i].silverDisplay + '"><div class="silverMedalAmountBubble">' + o[i].silverMedalCount + '</div></div></div>'
                                    + '<div id="bronzeMedals-' + o[i].id + '" class="medalContainer"><div style="' + o[i].bronzeDisplay + '"><div class="bronzeMedalAmountBubble">' + o[i].bronzeMedalCount + '</div></div></div>'
                                + '</div><div class="scoreNumber" id="userscore-'+ o[i].id + '">' + o[i].score + '</div></div></li>';
                        $("#leaderboard").append(newUser);
                    } else {
                        // this id does exist
                        //update user elements in the list item.
                        $('#userbar-'+ o[i].id).prop('title', o[i].userTitle);
                        $('#userscore-'+o[i].id).html(o[i].score);
                        $('#userplace-'+o[i].id).html('<h3 style="display:none;" id="user-' + o[i].id + '">' + o[i].order + '</h3>' + getGetOrdinal(o[i].place) + ': ');
                        $('#goldMedals-' + o[i].id).html('<div style="' + o[i].goldDisplay + '"><div class="goldMedalAmountBubble">' + o[i].goldMedalCount + '</div></div></div>');
                        $('#silverMedals-' + o[i].id).html('<div style="' + o[i].silverDisplay + '"><div class="silverMedalAmountBubble">' + o[i].silverMedalCount + '</div></div></div>');
                        $('#bronzeMedals-' + o[i].id).html('<div style="' + o[i].bronzeDisplay + '"><div class="bronzeMedalAmountBubble">' + o[i].bronzeMedalCount + '</div></div></div>');
                        $('#userbar-'+ o[i].id).animate({
                            width: o[i].scale+"%"
                        }, 1300 );
                    }
                }
                sort();
            });
            var fullResponse = new String(ajaxCall.responseText);
            if (fullResponse.startsWith("ERROR:")) {
                console.log ('Response contained error: ' + fullResponse);
                $("#badData").html('<center>' + fullResponse + '</center>');
                $("#badData").show("slow");
                //Scoreboard will not refresh after this
                console.log("Scoreboard will not refresh following this error");
            } else {
                $("#badData").hide("fast");
                lastUpdated = new Date().getTime();
                // play it again, sam (7 secs)
                t=setTimeout("poll()",7000);
            }*/
        }
    }
});