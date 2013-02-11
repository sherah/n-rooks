var chester = this.get('board');
      var firstPiece = false;
      var locationsToCheck = [];
      if(upLeftIndex === 0 || upLeftIndex === 8){
        return false;        
      }


      if(upLeftIndex === 1){
        locationsToCheck.push[0,1];
        locationsToCheck.push[1,0];
      }
      if(upLeftIndex === 2){
        locationsToCheck.push[0,2];
        locationsToCheck.push[2,0];
        locationsToCheck.push[1,1];
      }
      if(upLeftIndex === 3){
        locationsToCheck.push[0,3];
        locationsToCheck.push[1,2];
        locationsToCheck.push[2,1];
        locationsToCheck.push[3,0];
      }
      if(upLeftIndex === 4){
        locationsToCheck.push[0,4];
        locationsToCheck.push[1,3];
        locationsToCheck.push[2,2];
        locationsToCheck.push[3,1];
        locationsToCheck.push[4,0];
      }

      if(upLeftIndex === 5){
        locationsToCheck.push[1,4];
        locationsToCheck.push[2,3];
        locationsToCheck.push[3,2];
        locationsToCheck.push[4,1];
      }

      if(upLeftIndex === 6){
        locationsToCheck.push[2,4];
        locationsToCheck.push[3,3];
        locationsToCheck.push[4,2];
      }

      if(upLeftIndex === 7){
        locationsToCheck.push[3,4];
        locationsToCheck.push[4,3];
      }
      //upLeftIndex
      //we need to describe what locations that are on the upleft index
      //the number of upleft indexes = n * 2 -1
      //The midpoint, will always be the largest number of locations
      //From 0 -> the midpoint
      //If the angle = 1
      // rows will be 0  -> angle
      // cols will be angle -> 0

      //if the angle = 2
      //the rows will be 0 -> angle
      //the cols will be angle -> 0

      //if the angle = 3
      //the rows will be 0 -> angle
      // the cols will be angle -> 0

      //From  0 -> midpoint
      var halfwaypoint = (this.get('n') - 1 )
      for(var r = 0; r < halfwaypoint; r++){
        for(var c=halfwaypoint; c > halfwaypoint; c--){
          locationsToCheck.push([r, c]);
        }
      }

      //from the midpoint - > end
      for(var r)