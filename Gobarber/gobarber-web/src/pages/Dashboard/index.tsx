import React, { useState, useCallback } from 'react';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiPower, FiClock } from 'react-icons/fi';

import {
	Container,
	Header,
	HeaderContent,
	Profile,
	Content,
	Schedule,
	Calendar,
	NextAppointment,
	Session,
	Appointment,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const { signOut, user } = useAuth();

	const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
		if (modifiers.available) {
			setSelectedDate(day);
		}
	}, []);

	return (
		<Container>
			<Header>
				<HeaderContent>
					<img src={logoImg} alt="Go Barber" />
					<Profile>
						<img src={user.avatar_url} alt={user.name} />
						<div>
							<span>Bem-Vindo,</span>
							<strong>{user.name}</strong>
						</div>
					</Profile>
					<button type="button" onClick={signOut}>
						<FiPower />
					</button>
				</HeaderContent>
			</Header>
			<Content>
				<Schedule>
					<h1>Horários agendados</h1>
					<p>
						<span>Hoje</span>
						<span>dia 29</span>
						<span>sabado</span>
					</p>

					<NextAppointment>
						<strong>Atendimento a seguir</strong>
						<div>
							<img
								src="https://avatars0.githubusercontent.com/u/28990749?s=460&u=51d46e5f06b9446c867c1ef8a9c6e70bd1e90ec2&v=4"
								alt=""
							/>
							<strong>Ismael</strong>
							<span>
								<FiClock />
								99:00
							</span>
						</div>
					</NextAppointment>

					<Session>
						<strong>Manhã</strong>

						<Appointment>
							<span>
								<FiClock />
{' '}
08:00
							</span>

							<div>
								<img
									src="https://avatars0.githubusercontent.com/u/28990749?s=460&u=51d46e5f06b9446c867c1ef8a9c6e70bd1e90ec2&v=4"
									alt=""
								/>
								<strong>Ismael</strong>
							</div>
						</Appointment>
						<Appointment>
							<span>
								<FiClock />
								08:00
							</span>

							<div>
								<img
									src="https://avatars0.githubusercontent.com/u/28990749?s=460&u=51d46e5f06b9446c867c1ef8a9c6e70bd1e90ec2&v=4"
									alt=""
								/>
								<strong>Ismael</strong>
							</div>
						</Appointment>
					</Session>
					<Session>
						<strong>Tarde</strong>
						<Appointment>
							<span>
								<FiClock />
								08:00
							</span>

							<div>
								<img
									src="https://avatars0.githubusercontent.com/u/28990749?s=460&u=51d46e5f06b9446c867c1ef8a9c6e70bd1e90ec2&v=4"
									alt=""
								/>
								<strong>Ismael</strong>
							</div>
						</Appointment>
					</Session>
				</Schedule>
				<Calendar>
					<DayPicker
						weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
						fromMonth={new Date()}
						disabledDays={[{ daysOfWeek: [0, 6] }]}
						modifiers={{
							available: { daysOfWeek: [1, 2, 3, 4, 5] },
						}}
						onDayClick={handleDateChange}
						selectedDays={selectedDate}
						months={[
							'Janeiro',
							'Fevereiro',
							'Março',
							'Abril',
							'Maio',
							'Junho',
							'Julho',
							'Agosto',
							'Setembro',
							'Outubro',
							'Novembro',
							'Dezembro',
						]}
					/>
				</Calendar>
			</Content>
		</Container>
	);
};

export default Dashboard;
