package com.blake.railway.passenger.departureboard;

import java.io.File;
import java.net.URL;

import com.blake.railway.passenger.departureboard.model.LdbService;
import com.blake.railway.passenger.departureboard.util.JsonUtils;
import com.blake.railway.passenger.departureboard.web.DepartureBoardController;
import com.thalesgroup.rtti._2017_10_01.ldb.StationBoardResponseType;

import org.junit.Test;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.mock;

public class DepartureBoardApplicationTest
{
    private final Logger logger = LoggerFactory.getLogger(DepartureBoardApplicationTest.class);


    @Test
    public void getDepartureBoardTest()
    {
        LdbService ldbService = mock(LdbService.class);
        ClassLoader classLoader = getClass().getClassLoader();
        URL fileUrl = classLoader.getResource("StationBoardResult.json");
        if (fileUrl != null)
        {
            Mockito.when(ldbService.getDepartureBoard())
                   .thenReturn(JsonUtils.deserialise(StationBoardResponseType.class, new File(fileUrl.getFile())));
        }

        DepartureBoardController departureBoardController = new DepartureBoardController();
        departureBoardController.setLdbService(ldbService);
        final StationBoardResponseType departureBoard = departureBoardController.getDepartures();
        logger.info(JsonUtils.serialise(departureBoard));
        assertThat(departureBoard.getGetStationBoardResult().getCrs(), is(equalTo("MTB")));
    }
}
