package com.blake.railway.passenger.departureboard.web;

import com.blake.railway.passenger.departureboard.model.LdbService;
import com.thalesgroup.rtti._2017_10_01.ldb.StationBoardResponseType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DepartureBoardController
{
    private LdbService ldbService;

    @Autowired
    public void setLdbService(LdbService ldbService)
    {
        this.ldbService = ldbService;
    }

    @RequestMapping(value = "/departures/{crs}", method = RequestMethod.GET)
    @CrossOrigin(origins = "*")
    public StationBoardResponseType getDepartures(@PathVariable("crs") final String crs,
                                                  @RequestParam(value="rows", required = false, defaultValue = "5") int rows)
    {
        return ldbService.getDepartureBoard(crs, rows);
    }
}
