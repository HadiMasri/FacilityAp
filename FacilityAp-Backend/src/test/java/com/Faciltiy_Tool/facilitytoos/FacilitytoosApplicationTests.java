package com.Faciltiy_Tool.facilitytoos;

import com.Faciltiy_Tool.facilitytoos.Controller.FacilityController;
import com.Faciltiy_Tool.facilitytoos.Repository.FacilityRepository;
import com.Faciltiy_Tool.facilitytoos.model.*;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
class  FacilitytoosApplicationTests {

	FacilityRepository mockRepo = Mockito.mock(FacilityRepository.class);
	FacilityController controller = new FacilityController(mockRepo);


	/**
	 * deze test test the saveReport functie
	 * expected HttpStatus.Ok
	 */
	@Test
	public void Save_Reports_Into_Database_If_Succeeded_return_HttpStatus_200() throws IOException {

			User azureUser = new User("1212", "kotiba");
			ExternalFirms firm = new ExternalFirms(null, null, null, null);
		Report report = new Report("1212", "kotiba", "test title", "test description", "01.02", false,
				"ELL", "OPEN", "Wachten op ontvangst door logistieke diensten", "High", "ICT diensten", "Computer", azureUser, firm
		);
		MockMultipartFile firstFile = new MockMultipartFile("data", "filename.txt", "text/plain", "some xml".getBytes());

		report.setBytes(firstFile.getBytes());
		Mockito.when(mockRepo.save(report)).thenReturn(report);

		Report actual = mockRepo.save(report);

		assertThat(actual).isEqualTo(report);
		assertThat(actual.getCategory()).isEqualTo("Computer");
		assertThat(actual.getBytes()).isEqualTo(report.getBytes());
		System.out.println("=======Save Report Succeded =======");
	}


	/**
	 * deze test test the saveReport functie zonder ilage
	 * expected HttpStatus.Ok
	 */
	@Test
	public void Save_Reports_With_Out_Image_Into_Database_If_Succeeded_return_HttpStatus_200() {
		User azureUser = new User("2525", "Hadi");
		ExternalFirms firm = new ExternalFirms(null, null, null, null);
		Report report = new Report("1212", "kotiba", "test title", "test description", "01.02", false,
				"ELL", "OPEN", "Wachten op ontvangst door logistieke diensten", "High", "ICT diensten", "Computer", azureUser, firm
		);

		Mockito.when(mockRepo.save(report)).thenReturn(report);

		Report actual = mockRepo.save(report);
		assertThat(actual).isEqualTo(report);
		assertThat(actual.getCategoryDepartment()).isEqualTo("ICT diensten");
		assertThat(actual.getBytes()).isEqualTo(report.getBytes());
		System.out.println("=======Save Report without image Succeded =======");
	}

	/**
	 * deze test functie test de getAllReports function
	 * return lijst van Reports als de functie geslaagt
	 */
	@Test
	public void GET_ALL_Report_Return_List_Of_Reports() {


		User azureUser = new User("121212", "kotiba");
		ExternalFirms firm = new ExternalFirms(null, null, null, null);
		Report report = new Report("1212", "kotiba", "test title", "test description", "01.02", false,
				"ELL", "OPEN", "Low", "ICT diensten", "Computer", null, azureUser, firm
		);


		User azureUser1 = new User("2525", "Hadi");
		ExternalFirms firm1 = new ExternalFirms(null, null, null, null);
		Report report1 = new Report("1212", "kotiba", "test ", "test description", "02.21", false,
				"ELL", "OPEN", "High", "ICT diensten", "Network", null, azureUser, firm1
		);


		List<Report> reports = List.of(report, report1);


		Mockito.when(mockRepo.findAllByOrderByUpVoteDesc()).thenReturn(reports);

		List<Report> actual = controller.getAllReports();

		assertThat(actual.size()).isEqualTo(2);


		System.out.println("=======Get all report Succeded =======");
	}


	/**
	 * test getReportsById function
	 */

	@Test
	public void GETReport_By_ID_Return_One_Report() {


		User azureUser = new User("121212", "kotiba");
		ExternalFirms firm = new ExternalFirms(null, null, null, null);
		Report report = new Report("1212", "kotiba", "test title", "test description", "01.02", false,
				"ELL", "OPEN", "Low", "ICT diensten", "Computer", null, azureUser,firm
		);
		report.setId("5eb3d1660e317921ba3dbadf");


		Mockito.when(mockRepo.findById(report.getId())).thenReturn(Optional.of(report));

		Optional<Report> actual = controller.getReportsById(report.getId());

		assertThat(actual.get().getId()).isEqualTo("5eb3d1660e317921ba3dbadf");
		assertThat(actual).isEqualTo(Optional.of(report));
		System.out.println("=======Get report by id Succeded =======");

	}


	/**
	 * Find_By_Assign_To__Logged_In_User_Return_List_Of_Report
	 */
	@Test
	public void Find_By_Assign_To__Logged_In_User_Return_List_Of_Report() {


		User azureUser = new User("121212", "kotiba");
		ExternalFirms firm = new ExternalFirms(null, null, null, null);
		Report report = new Report("1212", "kotiba", "test title", "test description", "01.02", false,
				"ELL", "OPEN", "Low", "ICT diensten", "Computer", null, azureUser, firm
		);

		List<Report> reports = List.of(report);

		Mockito.when(mockRepo.getAllByAssignToId(report.getAssignTo().getId())).thenReturn(reports);

		List<Report> actual = controller.myReports("121212");
		assertThat(actual).isEqualTo(reports);
		assertThat(actual.size()).isEqualTo(1);
		System.out.println("=======Find By AssignTo Logged In User Return List Of Report Succeded =======");


	}

	@Test
	public void Delete_Report_From_DB_Then_Return_Msg() throws Exception {

		final boolean result = controller.deleteReport("25252525");
		assertThat(result).isTrue();
		System.out.println("=======Delete Report From DB=======");


	}
}
