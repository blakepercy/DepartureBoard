package com.blake.railway.passenger.departureboard;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class DepartureboardApplicationTestIT
{
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void contextLoads()
    {
    }

    @Test
    public void getDepartureBoardTestJustCrs() throws Exception
    {
        mockMvc.perform(get("/departures/MTB"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.getStationBoardResult.crs").value(equalTo("MTB")));
    }

    @Test
    public void getDepartureBoardTestCrsAndRows() throws Exception
    {
        mockMvc.perform(get("/departures/DBY?rows=8"))
               .andDo(print())
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.getStationBoardResult.crs").value(equalTo("DBY")));
    }

}
